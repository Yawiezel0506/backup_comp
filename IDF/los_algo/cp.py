async def optimal_los_polygon_process(inp, res):
    polygon_coordinates = inp.coordinates
    min_distance = inp.distance
    point_amount = inp.point_amount
    structures = inp.structures
    target_adv = inp.target_adv
    dest_adv = inp.dest_adv
    k_faktor = inp.k_faktor
    max_dist = inp.max_dist
    color_mode = inp.color_mode
    
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(polygon_coordinates)
    
    polygon_area = calc_extent_area(min_lon, min_lat, max_lon, max_lat)
    
    validate_polygon_size(polygon_area, res)
    
    raster_file_path = polygon_raster_chooser(structure=True, area=polygon_area)
    
    with rasterio.open(raster_file_path) as dataset:
        shapely_polygon = Polygon(polygon_coordinates)
        dtm_masked, transform = mask(dataset, [shapely_polygon], crop=True)
        window_heights = dtm_masked[0]
        resolution = dataset.res[0] * 111320
        
        coords = generate_cordinates_grid(window_heights, transform)
        
        height, width = window_heights.shape
        polygon_mask = generate_polygon_mask(polygon_coordinates, height, width, transform)
        
        valid_window = filter_dtm_valid_points(window_heights)
        
        radius_pixels = generate_radius_pixels(min_distance, resolution)
        
        highest_points = highest_points_finder(
            window_heights, valid_window, radius_pixels, point_amount
        )
        
        highest_coords = coords_with_best_res_finder(
            highest_points, shapely_polygon, polygon_area, structures, transform
        )
        
        los_results = calc_los_for_highest_points(
            highest_points, highest_coords, transform, window_heights,
            coords, polygon_mask, target_adv, dest_adv, max_dist, k_faktor, color_mode
        )
        
        parsed_los_results = parse_top_los_point_to_publish(
            los_results, resolution, extent, polygon_coordinates
        )
        
        return parsed_los_results


def generate_coordinates_grid(elevations, transform):
    height, width = elevations.shape
    rows, cols = np.meshgrid(np.arange(height), np.arange(width), indexing='ij')
    lats, lons = xy(transform, rows, cols)
    
    return np.dstack((np.array(lats), np.array(lons)))

def generate_polygon_mask(coordinates, height, width, transform):
    shapely_polygon = Polygon(coordinates)
    polygon_geom = {'type': 'Polygon', "coordinates":[list(shapely_polygon.exterior.coords)]}
    polygon_mask = rasterio.features.geometry_mask([polygon_geom], out_shape=(height, width), transform=transform, invert=True)
    return polygon_mask.astype(np.bool_)

def highest_points_finder(window_heights, valid_window, radius_pixels, point_amount):
    highest_points = []
    for _ in range(point_amount):
        candidate_window = np.where(valid_window, window_heights, -np.inf)
        candidate_val = np.max(candidate_window)
        if candidate_val == -np.inf or candidate_val == -32564:
            break
        candidate_idx = np.argmax(candidate_window)
        row, col = np.unravel_index(candidate_idx, window_heights.shape)
        highest_points.append((row, col, window_heights[row, col]))
        
        valid_window = cover_circle_mask_on_window(valid_window, radius_pixels, row, col)
    return highest_points

def cover_circle_mask_on_window(window, radius_pixels, row, col):
    height, width = window.shape
    row_min = max(row - radius_pixels, 0)
    row_max = min(row + radius_pixels + 1, height)
    col_min = max(col - radius_pixels, 0)
    col_max = min(col + radius_pixels + 1, width)
    
    y, x = np.ogrid[row_min:row_max, col_min:col_max]
    circle_mask = (y - row) ** 2 + (x - row) ** 2 < radius_pixels ** 2
    window[row_min:row_max, col_min:col_max][circle_mask] = False
    return window

def coords_with_best_res_finder(points, polygon, window_size, structure, transform):
    if (structure and window_size < 1000):
        coordinates = parse_indices_to_coordinates(points, polygon, window_size, transform)
    else:
        coordinates = extract_coordinates_by_indices(points, polygon, window_size, transform)
    return coordinates

def calc_los_for_highest_points(points, coordinates, transform, window_heights, coords, polygon_mask, target_adv, dest_adv, max_dist, k_faktor, color_mode):
    los_results = []
    
    for point, coord in zip(points, coordinates):
        row, col, height = point
        world_x, world_y = coord
        
        los_map = compute_los_polygon(
            window_heights,
            coords,
            polygon_mask,
            transform,
            (row, col),
            (world_x, world_y),
            target_adv,
            dest_adv,
            k_faktor,
            max_dist,
            k_faktor,
            color_mode
        )
        
        image_map = generate_los_image(los_map, color_mode)
        
        img_str = encode_image(image_map)
        
        los_in_polygon = los_map[polygon_mask]
        los_mask = los_in_polygon == 1
        percentage = np.count_nonzero(los_mask) / los_in_polygon.size * 100
        
        los_results.append(([float(world_x), float(world_y)], int(height), percentage, img_str))
    
    los_results = sorted(los_results, key=lambda p: p[2], reverse=True)
    return los_results



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