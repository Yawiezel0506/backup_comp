import os 

import rasterio
from rasterio.windows import Window

from logger.custom_logger import logger


def get_point_elevation(lon, lat):
    raster_file_path = os.getenv('RASTER_FILE_PATH')
    try:
        with rasterio.open(raster_file_path) as dataset:
            row, col = dataset.index(lon, lat)
            window = Window(coll_off=col, row_off=row, width=1, height=1)
            data = dataset.read(1, window=window)
            height = data[0, 0 ]
            return int(height)
    except Exception as e:
            return None
        
def get_point_elevation_from_file(lon, lat, dataset):
    try:
        if dataset is None:
            raise ValueError("No dataset")
        row, col = dataset.index(lon, lat)
        window = Window(coll_off=col, row_off=row, width=1, height=1)
        data = dataset.read(1, window=window)
        height = data[0, 0 ]
        return int(height)
    except Exception as e:
        return None