#model...
class AngleLosPolygonModel(BaseModel):
    coordinates: List[List[float]] = Field(..., example=[[0.0, 1.0], [0.0, 0.0]])
    center: List[float] = Field(..., example=[0.0, 1.0])
    originHeight: int = Field(..., example=1)
    destHeight: int = Field(..., example=1)
    kFactor: float = Field(..., example=1.33)
    colorMode: int = Field(..., example=1)
    azimuthBeamWidth: float = Field(..., example=40.0)
    elevationBeamWidth: float = Field(..., example=40.0)
    roll: float = Field(..., example=0.0)
    azimuth: float = Field(..., example=0.0)
    elevation: float = Field(..., example=0.0)
    maxDistance: float = Field(..., example=1000)
    


#api
@app.post("/angle-los-polygon-heatmap")
async def angle_los_polygon_heatmap(angleLosPolygonModel: AngleLosPolygonModel):
    try:
        response = await angle_los_polygon_heatmap(angleLosPolygonModel)
        return response
    except Exception as e:
        return {"error": str(e)}
    

#function
async def angle_los_polygon_heatmap(angleLosPolygonModel: AngleLosPolygonModel):
    # calculate heatmap
    start_coordinates = angleLosPolygonModel.center
    polygon_coordinates = angleLosPolygonModel.coordinates
    target_adv, dest_adv = angleLosPolygonModel.originHeight, angleLosPolygonModel.destHeight
    k_factor = angleLosPolygonModel.kFactor
    color_mode = angleLosPolygonModel.colorMode
    azimuth_beam_width = angleLosPolygonModel.azimuthBeamWidth
    elevation_beam_width = angleLosPolygonModel.elevationBeamWidth
    roll = angleLosPolygonModel.roll
    azimuth = angleLosPolygonModel.azimuth
    elevation = angleLosPolygonModel.elevation
    max_distance = angleLosPolygonModel.maxDistance
    
    
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(polygon_coordinates)
    
    polygon_area = calculate_polygon_area(min_lon, min_lat, max_lon, max_lat)
    
    validate_polygon_size(polygon_area)
    
    raster_file_path = os.getenv('RASTER_FILE_PATH')
    virtual_sphere_path = os.getenv('VIRTUAL_SPHERE_PATH')

    with rasterio.open(raster_file_path) as dataset:
        with h5py.File(virtual_sphere_path) as f:
            window_elevation, resolution, transform = await get_window_elevations(
                min_lon, min_lat, max_lon, max_lat, polygon_area, dataset
            )
            
            elevations_coords = generate_coordiantes_grid(window_elevation, transform)
            
            height, width = window_elevation.shape
            polygon_mask = generate_polygon_mask(polygon_coordinates, height, width, transform)
            
            start_indices = get_coord_indices(transform, start_coordinates, height, width)
            
            start_coordinates = np.array(start_coordinates)
            
            
            angular_distances = f['angular_distances'][elevation, azimuth]
            az_relative = f['az_relative'][elevation, azimuth]
            
            los_data = compute_angle_los_polygon(
                window_elevation, elevations_coords, polygon_mask, transform,
                start_indices, start_coordinates, target_adv, dest_adv, k_factor,
                angular_distances, az_relative, roll, azimuth_beam_width,
                elevation_beam_width, max_distance
            )
            
            image_map = generate_trinary_to_colors_map(los_data, color_mode)
            img_str = encode_image_to_base64(image_map)
            
            return {"image_map": img_str}
        

@njit(parallel=True)
def compute_angle_los_polygon(window_elevation, elevations_coords, polygon_mask, transform,
                              start_indices, start_coordinates, target_adv, dest_adv, k_factor,
                              angular_distances, az_relative, roll, azimuth_beam_width,
                              elevation_beam_width, max_distance):
    height, width = window_elevation.shape
    start_y, start_x = start_indices
    start_lon, start_lat = start_coordinates
    
    los_map = np.zeros((height, width), dtype=np.uint8)
    
    t = np.linspace(-np.pi, np.pi, 361)
    ellipse_dist = ellipse_distance(elevation_beam_width / 2, azimuth_beam_width / 2, t)
    roll_indices = int(roll / 360 * 360)
    ellipse_dist = np.roll(ellipse_dist, roll_indices)
    
    start_height = window_elevation[start_y, start_x] + target_adv
    
    for y in prange(height):
        for x in prange(width):
            dest_height = window_elevation[y, x] + dest_adv
            dest_lon, dest_lat = elevations_coords[y, x]
            distance = haversine_distance(start_lat, start_lon, dest_lat, dest_lon)
            
            if distance > max_distance:
                continue
            
            is_in_ellipse = is_in_ellipse_calculation(
                angular_distances, az_relative, start_lat, start_lon, dest_lat, dest_lon,
                distance, start_height, dest_height, t, ellipse_dist
            )
            
            if not is_in_ellipse:
                los_map[y, x] = 2
                continue
            
            los_res = calculate_los(
                window_elevation, polygon_mask, start_coordinates, start_indices, 
                (y, x), start_height, dest_height, distance, transform, k_factor
            )
            
            los_map[y, x] = los_res
    
    return los_map


@njit
def ellipse_distance(a, b, t):
    t = np.pi / 2 - t
    tan_squared_t = np.tan(t) ** 2
    a_squared = a ** 2
    b_squared = b ** 2
    x = np.sqrt(a_squared * b_squared / (b_squared + a_squared * tan_squared_t))
    y = np.sqrt(b_squared * a_squared * tan_squared_t / (b_squared + a_squared * tan_squared_t))
    return angular_dist_cannon(x, y)

@njit
def angular_dist_cannon(lon_deg, lat_deg):
    lon, lat = np.radians([lon_deg, lat_deg])
    angular_dist_cannon_rad = np.arccos(np.cos(lon) *  np.cos(lat))
    return angular_dist_cannon_rad

@njit
def is_in_ellipse_calculation(angular_distances, az_relative, start_lat, start_lon, dest_lat, dest_lon,
                              distance, start_height, dest_height, t, ellipse_dist):
    az = calculate_az(start_lat, start_lon, dest_lat, dest_lon)
    el = calculate_el(distance, start_height, dest_height)
    
    if az > 180:
        az -= 180
    elif az < -180:
        az += 180
    
    if el > 90:
        return 90
    elif el < -90:
        return -90
    
    az = int(round((az - -180) / (180 - -180) * 360))
    el = int(round((el - 90) / (90 - -90) * 180))
    
    relative_az, angular_dist = az_relative[el, az], angular_distances[el, az]
    
    angular_dist_req = np.interp(relative_az, t, ellipse_dist)
    
    return np.round(angular_dist, 6) <= np.round(angular_dist_req, 6)


