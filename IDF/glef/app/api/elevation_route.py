from typing import Optional

import os

import rasterio
from rasterio.windows import Window

from fastapi import APIRouter, WebSocket
from starlette.websocket import WebSocketDisconnect

from app.classes.elevation_classes import Coordinate
from app.constants.masagges import WS_DISCONNECT_ERROR, LAT, LON
from app.files_handler.elevation_singleton import ElevationSingleton
from app.files_handler.get_point_elevation import get_point_elevation
from app.logger.custom_logger import logger
from app.models.elevation_models import CoordinateModel, PolygonModel
from app.utils.polygon_utils import transform_polygon_coordinates_to_shapely_format
from app.ws_handler.websocket_manager import WebSocketManager

router = APIRouter()
web_socket_manager = WebSocketManager()

@router.post("/point-elevation")
async def point_elevation(coordinates: CoordinateModel):
    try:
        elevation_singletom_has_instance = ElevationSingleton.has_instance()
        lon, lat = coordinates.lon, coordinates.lat

        height: Optional[int, None]
        
        if elevation_singletom_has_instance:
            elevation_data = await ElevationSingleton.get_instance()
            height = elevation_data.get_point_elevation(Coordinate(lon, lat))
        else:
            height = get_point_elevation(lon, lat)
    except Exception as e:
        logger.error(e)



@router.post("/polygon-elevation")
def polygon_elevation(polygon: PolygonModel):
    try:
        res = transform_polygon_coordinates_to_shapely_format(polygon.coordinates[0])
        raster_file_path = os.getenv('RASTER_FILE_PATH')
        heights: list[int]
        with rasterio.open(raster_file_path) as dataset:
            for coords in res:
                lon, lat = coords[0], coords[1]
                row, col = dataset.index(lon, lat)
                window = Window(coll_off=col, row_off=row, width=1, height=1)
                data = dataset.read(1, window=window)
                height = data[0, 0]
                heights.append(height)

        return {"res": res, 'heights': heights}
    except Exception as e:
        logger.error(e)


@router.websocket("/point-elevation-ws")
async def point_elevation_ws(websocket: WebSocket):
    try:
        await web_socket_manager.connect(websocket)
        elevation_data = await ElevationSingleton.get_instance()
        while True:
            data = await websocket.receive_json()
            lon, lat = data.get(LON), data.get(LAT)
            height = await elevation_data.get_point_elevation(Coordinate(lon, lat))
            await web_socket_manager.send_massage({"height": height}, websocket)
    except Exception as e:
        logger.error(e)