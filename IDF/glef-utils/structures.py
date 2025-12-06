def structure_layer_generator():
    try:
        raster_file_path = os.getenv('RASTER_FILE')
        vector_file_path = os.getenv('VECTOR_FILE')
        
        with rasterio.open(raster_file_path) as src:
            elevation_raster = src.read(1)
            transform = src.transform
            dtm_crs = src.crs
            
        with fiona.open(vector_file_path) as gdb:
            gdb_crs = gdb.crs
            
            if gdb_crs != dtm_crs:
                raise ValueError("gdb_crs and dtm_crs must be the same value")
            
            for feature in gdb:
                try:
                    geom = shape(feature['geometry'])
                    polygon_elevation = feature['properties']['ABSOLUTE_FEATURE_HEIGHT']
                except Exception as e:
                    continue
                
                if polygon_elevation is None:
                    continue
                
                try:
                    window = geometry_window(src, [mapping(geom)], pad_x=0  , pad_y=0)
                except Exception:
                    continue
                
                if window.width == 0 or window.height == 0:
                    continue
                
                rows, cols = np.indices((window.height, window.width))
                rows, cols = rows + window.row_off, cols + window.col_off
                
                for row, col in zip(rows.flat, cols.flat):
                    pixel_x, pixel_y = src.xy(row, col)
                    if geom.contains(shape({'type': 'Point', 'coordinates': (pixel_x, pixel_y)})):
                        elevation_raster[row, col] = polygon_elevation
                
                with rasterio.open(
                    'update_file.tiff',
                    'w',
                    driver='GTiff'
                    height=elevation_raster.shape[0],
                    width=elevation_raster.shape[1],
                    count=1,
                    dtype=elevation_raster.dtype,
                    crs=dtm_crs,
                    transform=transform
                ) as dst:
                    dst.write(elevation_raster, 1)
            
    except Exception as e:
        print(f'Error generating: {e}')
        
    
structure_layer_generator()