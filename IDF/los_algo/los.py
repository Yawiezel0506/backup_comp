import numpy as np
from numba import njit, prange

@njit
def bresenham_line(center_y, center_x, y, x):
    dx = abs(x - center_x)
    dy = abs(y - center_y)
    sx = -1 if center_x > x else 1
    sy = -1 if center_y > y else 1
    err = dx - dy
    
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
    

@njit
def is_have_los(elevations: np.ndarray, center_x, center_y, dest_x, dest_y, center_adv, dest_adv, resolution):
    height, width = elevations.shape
    
    rr, cc = bresenham_line(center_y, center_x, dest_y, dest_x)
    rr, cc = np.clip(rr, 0, height - 1), np.clip(cc, 0, width - 1)
    
    start_elevation = elevations[center_y, center_x] + center_adv
    distances = np.sqrt((cc - center_x) ** 2 + (rr - center_y) ** 2) * resolution
    max_distance = np.max(distances)
    
    for i in range(len(rr)):
        r, c = rr[i], cc[i]
        line_elevations = elevations[r, c]
        dist = np.sqrt((c - center_x) ** 2 + (r - center_y) ** 2) * resolution
        end_elevation = elevations[dest_y, dest_x] + dest_adv
        expected_elevations = start_elevation + (dist / max_distance) * (end_elevation - start_elevation)
        
        if line_elevations > expected_elevations:
            return False
    
    return True


@njit
def is_center_or_is_adjacent(center_x, center_y, x, y):
    return abs(center_x - x) <= 1 and abs(center_y - y) <= 1


@njit
def generate_image_data(los_map: np.ndarray):
    height, width = los_map.shape
    image_data = np.zeros((height, width, 4), dtype=np.uint8)
    
    for y in range(height):
        for x in range(width):
            if los_map[y, x] == 0:
                image_data[y, x] = [255, 0, 0, 188] 
            elif los_map[y, x] == 1:
                image_data[y, x] = [0, 255, 0, 255] 
            else:
                image_data[y, x] = [0, 0, 255, 255]
    
    return image_data


@njit(parallel=True)
def compute_los_polygon(elevations, resolution, center_indexes, center_adv, dest_adv):
    height, width = elevations.shape
    center_x, center_y = center_indexes
    los_map = np.zeros((height, width))
    
    for y in prange(height):
        for x in prange(width):
            if elevations[y, x] == -32768:
                los_map[y, x] = 2
                continue
            if is_center_or_is_adjacent(center_x, center_y, x, y):
                los_map[y, x] = 1
                continue
            if is_have_los(elevations, center_x, center_y, x, y, center_adv, dest_adv, resolution):
                los_map[y, x] = 1
    
    return los_map

@router.post("los-polygon-heatmap")
async def los_polygon_heatmap(request: LosPolygonHeatmapRequest, response):
    try:
        image_data = await los_polygon_process(request, response)
        return image_data
    except Exception as e:
        response.status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        return {"error": str(e)}


async def los_polygon_process(request: LosPolygonHeatmapRequest, response):
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
        
        center_indexes = get_coord_indexes(transform, center_coordinates)
        
        target_adv, dest_adv = request.originHeight, request.destHeight
        
        los_map, measure_info, func_name = measure_func_info(
            compute_los_polygon,
            window_elevations,
            resolution,
            center_indexes,
            target_adv,
            dest_adv
        )
        
        image_map = generate_image_data(los_map)
        
        image_str: encode_image_to_base64(image_map)
        
        los_result = {
            "extent": extent,
            "resolution": resolution,
            "image": image_str,
            "location": [request.coordinates]
        }
        
        return los_result