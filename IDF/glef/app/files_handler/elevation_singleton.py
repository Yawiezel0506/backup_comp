import asyncio
import os
from asyncio import Task

import rasterio
from rasterio.windows import Window

from app.classes.elevatio_classes import Coordinate
from app.logger.custom_logger import logger


class ElevationSingleton:
    _instance = None
    _lock = asyncio.Lock()
    _refresh_interval = 900

    def __new__(cls) -> Self:
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._file_lock = asyncio.Lock()
            cls._instance.dataset = None
            cls._instance.refresh_task = None
        return cls._instance
    
    def _initialize(self):
        self.raster_file_path = os.getenv('RASTER_FILE_PATH')
        try:
            self.dataset = rasterio.open(self.raster_file_path)
        except IOError as e:
            logger.error('Error opening raster file: %s', e)
    
    @classmethod
    async def get_instance(cls):
        async with cls._lock:
            if cls._instance is None:
                cls._instance = cls()
                try:
                    cls._instance._initialize()
                    cls._instance.refresh_task = asyncio.create_task(cls._instance.refresh_dataset_periodically())
                except Exception as e:
                    logger.error(" failed to initialize instance for " + cls._instance)
            return cls._instance
        
    def get_point_elevation_from_file(self, lon, lat):
        try:
            row, col = self.dataset.index(lon, lat)
            window = Window(coll_off=col, row_off=row, width=1, height=1)
            data = self.dataset.read(1, window=window)
            height = data[0, 0 ]
            return int(height)
        except Exception as e:
            return None
        
    async def get_point_elevation(self, coordinate: Coordinate):
        lon, lat = coordinate.lon, coordinate.lat
        try:
            return await asyncio.to_thread(self.get_point_elevation_from_file, lon, lat)
        except Exception as e:
            logger.error(e)
            return None
        
    async def _refresh_dataset_periodically(self):
        while True:
            await asyncio.sleep(self._refresh_interval)
            await self._refresh_dataset()
    
    async def _refresh_dataset(self):
        async with self._file_lock:
            try:
                new_dataset = rasterio.open(self.raster_file_path)
                old_dataset = self.dataset
                self.dataset = new_dataset
                if old_dataset is not None:
                    old_dataset.close()
                logger.info("Dataset updated successfully")
            except Exception as e:
                logger.error("Error while updating dataset %  %s", self. dataset, e) 

    @classmethod
    async def shout_down(cls):
        async with cls._lock:
            if cls._instance:
                if cls._instance.dataset:
                    cls._instance.dataset.close()
                    cls._instance.dataset = None
                    logger.info("Dataset closed successfully")
                if cls._instance.refresh_tosk:
                    task: Task = cls._instance.refresh_task
                    task.cancel()
                    try:
                        await cls._instance.refresh_task
                    except asyncio.CancelledError as e:
                        logger.error("refresh task cancelled")
                logger.info("Task closed successfully")
                cls._instance = None
    

    @classmethod
    def has_instance(cls) -> bool:
        return cls._instance is not None