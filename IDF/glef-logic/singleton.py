import asyncio
import os
from asyncio import Task

import rasterio

from app.constants.general import RASTER_STRUCTURES_3M_FILE_PATH
from app.constants.logger_constants import POINT_ELEVATION_WS
from app.constants.messages import RASTER_ENV_NOT_FOUND_ERROR, REFRESH_TASK_CANCELLED, DATASET_SHOUT_DOWN

from app.glef_types.classes.elevation_classes import Coordinate
from app.utils.files_handler.extruct_elevation_utils import get_point_elevation_from_file
from app.utils.initials.setup_noc_llogger import noc_logger

class ElevationsSingleton:
    _instance = None
    _lock = asyncio.Lock()
    _refresh_interval = 600
    _dataset = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._file_lock = asyncio.Lock()
            cls._instance._dataset = None
            cls._instance._refresh_task = None
        return cls._instance
    
    def _initialize(self):
        self.raster_file_path = os.getenv(RASTER_STRUCTURES_3M_FILE_PATH)
        if not self.raster_file_path:
            raise Exception(RASTER_ENV_NOT_FOUND_ERROR)
        try:
            self.set_dataset(rasterio.open(self.raster_file_path))
        except Exception as e:
            raise Exception(e)
        
    @classmethod
    async def get_instance(cls):
        async with cls._lock:
            if cls._instance is None:
                cls._instance = cls()
                try:
                    cls._instance._initialize()
                    cls._instance._refresh_task = asyncio.create_task(cls._instance._refresh_dataset_periodically())
                except Exception as e:
                    raise Exception(e)
            return cls._instance
        
    async def get_point_elevation(self, coordinate: Coordinate):
        lon, lat = coordinate.lon, coordinate.lat
        try:
            return await asyncio.to_thread(get_point_elevation_from_file, lon, lat, self.get_dataset())
        except Exception as e:
            noc_logger.error(f"{POINT_ELEVATION_WS}: {str(e)}")
            return None
    
    async def _refresh_dataset_periodically(self):
        while True:
            await asyncio.sleep(self._refresh_interval)
            await self._refresh_dataset()
    
    async def _refresh_dataset(self):
        async with self._file_lock:
            try:
                new_dataset = rasterio.open(self.raster_file_path)
                old_dataset = self._get_dataset()
                self._set_dataset(new_dataset)
                if old_dataset:
                    old_dataset.close()
            except Exception as e:
                raise Exception(e)
    
    @classmethod
    def _get_dataset(cls):
        return cls._instance._dataset
    
    @classmethod
    def _set_dataset(cls, dataset):
        cls._instance._dataset = dataset
        
    
    @classmethod
    async def shut_down(cls):
        try:
            async with cls._lock:
                if cls._instance._dataset:
                    cls._instance._dataset.close()
                    del cls._instance._dataset
                    cls._instance._dataset = None
                if cls._instance._refresh_task:
                    task: Task =  cls._instance._refresh_task
                    task.cancel()
                    try: 
                        await task
                    except asyncio.CancelledError:
                        noc_logger.info("Task cancelled")
                cls._instance = None
                noc_logger.info(DATASET_SHOUT_DOWN)
        except Exception as e:
            noc_logger.error(f"Error shutting down elevation service: {str(e)}")
        
        
    @classmethod
    def has_instance(cls) -> bool:
        return cls._instance is not None
    
    

@router.websocket("/point-elevation-ws")
async def websocket_point_elevation(websocket):
    try:
        await websocket.connect(websocket)
        elevation_data = await ElevationsSingleton.get_instance()
        while True:
            message = await websocket.receive()
            coordinate = Coordinate.parse_raw(message.json())
            elevation = await elevation_data.get_point_elevation(coordinate)
            if elevation is not None:
                await websocket.send_json({"elevation": elevation})
    except WebSocketDisconnect:
        noc_logger.info(REFRESH_TASK_CANCELLED)
    except Exception as e:
        noc_logger.error(f"{POINT_ELEVATION_WS}: {str(e)}")