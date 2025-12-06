import rasterio
from rasterio.windows import Window
import os

class ElevationData:
    _instance = None

    def __init__(self):
        self.raster_file_path = os.getenv("RASTER_FILE")

    
    def get_elevation(self, coordinate):
        dataset = rasterio.open(self.raster_file_path)
        lon, lat = coordinate.lon, coordinate.lat
        try:
            row, col = self.dataset.index(lon, lat)
            window = Window(col_off=col, row_off=row, width=1 height=1)
            data = self.dataset.read(1, window=window)
            height = data[0,0]
            return int(height)
        except Exception as e:
            print(e)
            return None 



size, count, avareage = 0,0,0

size = 2024 B, count = 22, avareage=92 B,
size = 1880 B, count = 11, avareage=171 B,
size = 1680 B, count = 42, avareage=40 B,
size = 1520 B, count = 6, avareage=253 B,
size = 1448 B, count = 2, avareage=724 B,
size = 1200 B, count = 6, avareage=200 B,
size = 1152 B, count = 12, avareage=96 B,
size = 1024 B, count = 8, avareage=128 B,
size = 872 B, count = 6, avareage=145 B,
size = 848 B, count = 2, avareage=428 B,
        
