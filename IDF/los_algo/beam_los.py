class BeamLosPolygonModel(BaseModel):
    coordinates: List[List[float]]
    center: List[float]
    originHeight: int = 1
    destHeight: int = 1
    kFactor: float = 1.33
    azimuthBeamWidth: float
    elevationBeamWidth: float
    roll: float = 0
    maxDistance: float
    azimuth: float
    elevation: float = 0
    

router = ApiRouter()

@router.post("/beam-los-polygon")
async def beam_los_polygon(request: BeamLosPolygonModel, response: Response):
    try:
        beam_los_res = await beam_los_polygon_process(request, response)
        return beam_los_res
    except Exception as e:
        response.status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        return {"error": str(e)}
    

async def beam_los_polygon_process(request: BeamLosPolygonModel, response: Response):
    start_coordinates = request.center
    polygon_coordinates = request.coordinates
    target_adv, dest_adv = request.originHeight, request.destHeight
    k_factor = request.kFactor
    
    azimuth, elevation = request.azimuth, request.elevation
    az_beam, el_beam = request.azimuthBeamWidth, request.elevationBeamWidth
    roll = request.roll
    max_distance = request.maxDistance
    max_distance = np.radians(max_distance)
    
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(polygon_coordinates)
    
    polygon_area = calc_extent_area(min_lon, min_lat, max_lon, max_lat)
    
    validate_polygon_size(polygon_area, response)
    
    raster_file_path = polygon_raster_chooser(structure=True, area=polygon_area)
    antenna_file_path = os.getenv('ANTENNA_FILE')
    
    with rasterio.open(raster_file_path) as dataset:
        with h5py.File(antenna_file_path, "r") as f:
            check_start_point(start_coordinates, response, dataset)
            
            window_elevations, resolution, transform = await get_window_elevations_from_file(
                min_lon, max_lon, min_lat, max_lat, polygon_area, response, dataset
            )
            
            coords = generate_coords_grid(window_elevations, transform)
            
            height, width = window_elevations.shape
            
            polygon_mask = generate_polygon_mask(polygon_coordinates, height, width, transform)
            
            start_indexes = get_coord_indexes(transform, start_coordinates)
            
            start_coordinates = np.array(start_coordinates)
            
            tx_az_idx = int(azimuth) % 360
            tx_el_idx = int(elevation + 90) % 180
            
            angular_distances = f["angular_distances"][tx_el_idx, tx_az_idx]
            az_difference = f["azimuth_difference"][tx_el_idx, tx_az_idx]
            
            los_data = compute_los_polygon(
                window_elevations,
                coords,
                polygon_mask,
                transform,
                start_indexes,
                start_coordinates,
                target_adv,
                dest_adv,
                k_factor,
                angular_distances,
                az_difference, 
                roll,
                az_beam,
                el_beam,
                elevation,
                max_distance
            )
            
            image_map = generate_polygon_012_data_to_colors_map(los_data)
            img_str = encode_img_data_to_base_64(image_map)
            
            return img_str


@njit(parallel=True)
def compute_los_polygon(
    window_elevations,
    coords,
    polygon_mask,
    transform,
    start_indexes,
    start_coords,
    target_adv,
    dest_adv,
    k_factor,
    angular_distances,
    az_difference,
    roll,
    az_beam,
    el_beam,
    elevation,
    max_distance
):
    height, width = window_elevations.shape
    start_x, start_y = start_indexes
    start_lon, start_lat = start_coords
    
    los_data = np.zeros((height, width), dtype=np.uint8)
    
    start_height = window_elevations[start_y, start_x]
    total_start_height = start_height + target_adv
    
    for y in prange(height):
        for x in range(width):
            dest_height = window_elevations[y, x]
            total_dest_height = dest_height + dest_adv
            dest_lon, dest_lat = coords[y, x]
            distnace = haversine_distance(start_lat, start_lon, dest_lat, dest_lon)
            
            los_result = validate_los(
                window_elevations,
                polygon_mask,
                start_coords,
                start_indexes,
                (y, x),
                total_start_height,
                total_dest_height,
                distnace,
                transform,
                k_factor
            )
            if los_result == 1:
                az = calculate_az(start_lat, start_lon, dest_lat, dest_lon)
                el = calculate_el(distnace, total_start_height, total_dest_height)
                
                rx_az_idx = int(az) % 360
                rx_el_idx = int(el + 90) % 180
                
                angular_dustance = angular_distances[rx_el_idx, rx_az_idx]
                az_difference_angle = az_difference[rx_el_idx, rx_az_idx]
                
                az_difference_angle = (np.degrees(az_difference_angle) - roll) % 360
                
                within_az_range = abs(az_difference_angle) <= az_beam / 2
                within_el_range = abs(el - elevation) <= el_beam / 2
                within_dist = angular_dustance <= max_distance
                
                
                if within_az_range and within_el_range and within_dist:
                    los_data[y, x] = los_result
                else:
                    los_data[y, x] = 0
    
    return los_data
    