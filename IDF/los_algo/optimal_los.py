class OptimalLosPolygon_model(BaseModel):
    coordinates: List[List[float]]
    center: List[float]
    originHeight: int = 1
    destHeight: int = 1
    azimuthWidth: float
    elevationWidth: float
    roll: float = 0
    


router = ApiRouter()

@router.post("loptimal-los-polygon")
async def optimal_los_polygon(request: OptimalLosPolygon_model, response: Response):
    try:
        optimal_los_res = await optimal_los_polygon_process(request, response)
        return optimal_los_res
    except Exception as e:
        response.status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        return {"error": str(e)}
    

def generate_polygon_mask(coordinates, height, width, transform):
    shapely_polygon = Polygon(coordinates)
    polygon_geom = {'type': 'Polygon', "coordinates":[list(shapely_polygon.exterior.coords)]}
    polygon_mask = rasterio.features.geometry_mask([polygon_geom], out_shape=(height, width), transform=transform, invert=True)
    return polygon_mask.astype(np.bool)

def generate_coords_grid(elevations, transform):
    height, width = elevations.shape
    rows, cols = np.meshgrid(np.arange(height), np.arange(width), indexing='ij')
    lats, lons = xy(transform, rows, cols)
    
    return np.dstack((np.array(lats), np.array(lons)))
    


async def optimal_los_polygon_process(request: OptimalLosPolygon_model, response: Response):
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(request.coordinates)
    center_coordinates = request.center
    
    polygon_area = calc_extent_area(min_lon, min_lat, max_lon, max_lat)
    
    validate_polygon_size(polygon_area, response)
    
    raster_file_path = polygon_raster_chooser(structure=True, area=polygon_area)
    
    with rasterio.open(raster_file_path) as dataset:
        check_start_point(center_coordinates, response, dataset)
        
        window_elevations, resolution, transform = await get_window_elevations_from_file_with_optimization(
            min_lon, max_lon, min_lat, max_lat, polygon_area, response, dataset
        )
        
        elevations_coords = generate_coords_grid(window_elevations, transform)
        
        height, width = window_elevations.shape
        
        polygon_mask = generate_polygon_mask(request.coordinates, height, width, transform)
        
        start_indexes = get_coord_indexes(transform, center_coordinates)
        start_coordinates = np.array(request.center)
        
        target_adv, dest_adv = request.originHeight, request.destHeight
        
        los_map_result, measure_info, func_name = measure_func_info(
            compute_optimal_los_polygon,
            window_elevations,
            elevations_coords,
            polygon_mask,
            transform,
            start_indexes,
            start_coordinates,
            target_adv,
            dest_adv
        )
        
        los_map, azimuth_map, elevation_map = los_map_result
        
        
        # image_map = generate_image_data(los_map)
        
        # image_str: encode_image_to_base64(image_map)
        
        # return image_str
    

@njit(parallel=True)
def compute_optimal_los_polygon(window_elevations, coords,  polygon_mask, transform, start_indexes, start_coords, target_adv, dest_adv):
    height, width = window_elevations.shape
    start_x, start_y = start_indexes
    start_lon, start_lat = start_coords
    
    los_map = np.zeros((height, width), dtype=np.uint8)
    azimuth_map = np.zeros((height, width), dtype=np.float64)
    elevation_key = np.zeros((height, width), dtype=np.float64)
    
    
    start_height = window_elevations[start_y, start_x] + target_adv
        
    for y in prange(height):
        row_los_map = np.zeros((width), dtype=np.uint8)
        row_azimuth_map = np.zeros((width), dtype=np.float64)
        row_elevation_map = np.zeros((width), dtype=np.float64)
        for x in range(width):
            dest_height = window_elevations[y, x] + dest_adv
            dest_lon, dest_lat = coords[y, x]
            distance = haversine_distance(start_lat, start_lon, dest_lat, dest_lon)
            los_result = validate_los(
                window_elevations, polygon_mask, start_coords, start_indexes, (x, y), target_adv, dest_adv, distance, transform
            )
            row_los_map[x] = los_result
            if los_result == 1:
                azimuth = calculate_azimuth(start_lat, start_lon, dest_lat, dest_lon)
                elevation = calculate_elevation(distance, start_height, dest_height)
                row_azimuth_map[x] = azimuth
                row_elevation_map[x] = elevation
                
                
        los_map[y, :] = row_los_map
        azimuth_map[y, :] = row_azimuth_map
        elevation_key[y, :] = row_elevation_map
    
    return los_map, azimuth_map, elevation_key



@njit
def validate_los(window_elevations, polygon_mask, start_x, start_y, x, y, target_adv, dest_adv, resolution):
    if not polygon_mask[y, x]:
        return 0
    if int(window_elevations[y, x]) == -32768:
        return 2
    if is_center_or_adjacent(center_x, center_y, x, y):
        return 1
    if is_have_los(window_elevations, start_x, start_y, x, y, target_adv, dest_adv, resolution):
        return 1
    return 0

