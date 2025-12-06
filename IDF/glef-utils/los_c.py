class LosModel(BaseModel):
    coordinates: List[List[float]]
    originHeight: int = 10
    destHeight: int = 10
    
    @validator('coordinates')
    def validate_coordinates(cls, coordinates):
        if not coordinates or len(coordinates) < 3:
            raise ValueError('coordinates must have at least 3 elements')
        if coordinates[0] != coordinates[-1]:
            raise ValueError('first element must be same as last element')
        return coordinates

@router.post('/los-heatmap')
async def window_los_heatmap(los_data: LosModel, response: Response):
    try:
        loop = asyncio.get_event_loop()
        with ThredPoolExecutor() as pool:
            img_data = await loop.run_in_executor(pool, los_process, los_data)
        return img_data
    except:
        print('error')

def get_polygon_bounds(polygon_coordinates):
    shapely_polygon = Polygon(polygon_coordinates)
    min_lon, min_lat, max_lon, max_lat = shapely_polygon.bounds
    extent = list(shapely_polygon.bounds)
    return min_lon, min_lat, max_lon, max_lat, extent

def haversine_distance(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])
    
    dlat, dlon = lat2 - lat1, lon2 - lon1
    
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = EARTH_RADIUS * c
    return distance

async def get_window_elevations_from_file_async(lon_min, lon_max, lat_min, lat_max, size):
    loop = asyncio.get_event_loop()
    
    with ThreadPoolEcecutor() as pool:
        elevation_data, resolution = await loop.run_in_executor(pool, get_window_elevations_from_file, lon_min, lon_max, lat_min, lat_max, size)
    
    return elevation_data, resolution

def get_window_elevations_from_file(lon_min, lon_max, lat_min, lat_max, size):
    raster_file_path = os.getenv(RATER_FILE_PATH)
    with rasterio.open(raster_file_path) as dataset:
        current_resolution = dataset.res[0]
        
        row_min, col_min = dataset.index(lon_min, lat_min)
        row_max, col_max = dataset.index(lon_max, lat_max)
        
        window = ((row_min, row_max), (col_min, col_max))
        elevations_data = dataset.read(1, window=window, masked=False)
        elevations_data = elevations_data.astype(np.int16)
        
        if size > 20:
            height, width = elevations_data.shape
            scale_factor = size / 20
            
            new_height = int(height / scale_factor)
            new_width = int(width / scale_factor)
            
            elevations_data = zoom(elevations_data, zoom=(new_height / height, new_width / width), order=1)
            resolution = current_resolution * scale_factor * 111.120
        
        else:
            resolution = current_resolution * 111.120
        
        return elevations_data, resolution

@njit
def is_center_or_adjacent(center_x, center_y, x, y):
    return abs(center_x - x) <= 1 and abs(center_y - y) <= 1

@njit
def bresenham_line(center_y, center_x, y, x):
    dx = abs(x - center_x)
    dy = abs(y - center_y)
    sx = 1 if center_x < x else -1
    sy = 1 if center_y < y else -1
    err = dx -dy
    
    line_rr = []
    line_cc = []
    
    while True:
        line_rr.append(center_y)
        line_cc.append(center_x)
        if center_x == x and center_y == y:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            center_x += sx
        if e2 < dx:
            err += dx
            center_y += sy
    
    return np.array(line_rr), np.array(line_cc)

@njit(paralell=True)
def compute_los(elevations, resolution, center_adv, dest_adv):
    height, width = elevations.shape
    center_y, center_x = height //2, width //2
    
    los_map = np.full((height, width), False)
    
    for y in prange(height):
        for x in prange(width):
            if is_center_or_adjacent(center_x, center_y, x, y):
                los_map[y, x] = True
                continue
            if is_have_los(elevations, center_x, center_y, x, y, center_adv, dest_adv, resolution):
                los_map[y, x] = True
    
    image_data = generate_image_data(los_map)
    
    return image_data

@njit
def is_have_los(elevations, center_x, center_y, dest_x, dest_y, center_adv, dest_adv, resolution):
    height, width = elevations.shape
    
    rr, cc = bresenham_line(center_x, center_y, dest_x, dest_y)
    rr, cc = np.clip(rr, 0, height - 1), np.clip(cc, 0, width - 1)
    
    start_elevation = elevations[center_x, center_y] + center_adv
    
    distances = np.sqrt((cc- center_x)**2 + (rr- center_y)**2) * resolution
    
    max_distance = np.max(distances)
    
    for i in range(len(rr)):
        r, c = rr[i], rr[i]
        line_elevation = elevations[r, c]
        distances = np.sqrt((c - center_x) ** 2 + (r- center_y) ** 2) * resolution
        end_resolution = elevations[dest_y, dest_x] + dest_adv
        expected_elevations = start_elevation + (distances / max_distance) * (end_resolution - start_elevation)
        
        if line_elevation > expected_elevations:
            return False
    
    return True

@njit
def generate_image_data(los_map):
    height, width = los_map.shape
    image_data = np.zeros((height, width, 4), dtype=np.uint8)
    
    for y in range(height):
        for x in range(width):
            color = [0, 255, 0, 255] if los_map[y, x] else [255, 0, 0, 0]
            image_data[y, x] = color
    
    return image_data

def process_point(elevations, center_x, center_y, x, y, center_adv, dest_adv):
    if is_center_or_adjacent(elevations, center_x, center_y, x, y):
        return x, y, True
    if is_have_los(elevations, center_x, center_y, x, y, center_adv, dest_adv):
        return x, y, True
    return x, y, False
        


def calc_extent_area(lon_min, lat_min, lon_max, lat_max):
    width = haversine_distance(lon_min, lat_min, lon_max, lat_min)
    height = haversine_distance(lon_min, lat_min, lon_min, lat_max)
    
    area = width * height
    return area
        

async def los_process(los_data: LosModel):
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(los_data.coordinates)
    area = calc_extent_area(min_lon, max_lon, min_lat, max_lat)
    if area > MAX_POLYGON_SIZE:
        raise ValueError('too big')
    
    height_size = haversine_distance(min_lon, min_lat, max_lon, max_lat)
    
    window_elevations, resolution = await get_window_elevations_from_file_async(min_lon, max_lon, min_lat, max_lat, height_size)
    if window_elevations.size == 0:
        raise ValueError('error')
    
    
    taget_adv, dest_adv = los_data.originalHeight, los_data.destHeight
    
    color_image = compute_los(window_elevations, resolution, taget_adv, dest_adv)
    
    img_str = encode_image_data_to_base_64(color_image)
    
    return {
        "extent": extent,
        "location": [los_data.coordinates],
        "image": img_str
    }
    
    
def encode_image_data_to_base_64(img_data):
    image = Image.fromarray(img_data, mode='RGBA')
    buffered = io.BytesIO()
    image.save(buffered, format='PNG')
    img_str = base64.b64encode(buffered.getvalue())
    return img_str

    
    
