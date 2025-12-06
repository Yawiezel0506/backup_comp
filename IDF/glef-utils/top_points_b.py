async def top_elevations_points(input):
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(input.coordinates)
    polygon_area = calc_extent_area(min_lon, min_lat, max_lon, max_lat)
    raster_file_path = os.getenv('RASTER_FILE')
    with rasterio.open(raster_file_path) as dataset:
        elevations = dataset.read(1)
        polygon = Polygon(input.coordinates)
        transform = dataset.transform
        polygon_mask = geometry_mask([polygon], transform=transform, invert=True, out_shape=elevations.shape)
        masked_elevations = np.ma.masked_array(elevations, mask=~polygon_mask)
        indices = np.argwhere(~masked_elevations.mask)
        lon_lat_elev = []
        for row, col in indices:
            lon, lat = rasterio.transform.xy(transform, row, col, offset='center')
            elev = masked_elevations[row, col]
            if np.ma.is_masked(elev):
                continue
            lon_lat_elev.append((lon, lat, elev))
            
        lon_lat_elev = sorted(lon_lat_elev, key=lambda x: x[2], reverse=True)
        
        selected_points = []
        
        for lon_lat_elev in lon_lat_elev:
            if len(selected_points) >= input.num_points:
                break
            if all(Point(lon, lat).distance(Point(px, py) >= input.distance for px, py, _ in selected_points)):
                selected_points.append((lon, lat, elev))
        
        return selected_points