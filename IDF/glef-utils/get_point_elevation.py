def get_window_elevations_from_file(lon_min, lon_max, lat_min, lat_max) -> np.ndarray:
    raster_file_path = os.getenv('RASTER_FILE')
    with rasterio.open(raster_file_path) as dataset:
        row_min, col_min = dataset.index(lon_min, lat_max)
        row_max, col_max = dataset.index(lon_max, lat_min)
        
        elevations_data = dataset.read(1, window=((row_min, row_max), (col_min, col_max)))
        elevations_data = elevations_data.astype(np.int16)
        
        return elevations_data


def get_point_elevation_from_file(lon, lat, dataset):
    row, col = dataset.index(lon, lat)
    window = Window(col_off=col, round_off=row, width=1, height=1)
    height = dataset.read(1, window=window)[0, 0]
    return int(height)
        