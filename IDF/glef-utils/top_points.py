import numpy as np
from numba import njit

@njit
def measure_distance_between_points(x1, y1, x2, y2):
    return np.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

@njit
def parse_transform(transform):
    return transform.a, transform.b, transform.c, transform.d, transform.e, transform.f

@njit
def convert_transform_to_lon(a, b, c, x, y):
    return a * x + b * y + c

@njit
def convert_transform_to_lat(d, e, f, x, y):
    return d * x + e * y + f

@njit
def is_point_in_polygon(x, y, polygon):
    n = len(polygon)
    inside = False

    for i in range(n):
        j = (i + 1) % n
        if ((polygon[i][1] <= y and y < polygon[j][1]) or
                (polygon[j][1] <= y and y < polygon[i][1])):
            x_inters = (polygon[j][0] - polygon[i][0]) * (y - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]
            if x_inters < x:
                inside = not inside

    return inside

@njit
def filter_points_by_polygon(points, polygon):
    filtered_points = []
    for i in range(len(points)):
        if is_point_in_polygon(points[i][0], points[i][1], polygon):
            filtered_points.append(points[i])
    return np.array(filtered_points)

@njit
def create_lon_lat_elev_array(elevations, transform):
    rows, cols = elevations.shape
    lon_lat_elev = np.empty((rows * cols, 3), dtype=np.float64)
    a, b, c, d, e, f = parse_transform(transform)
    
    idx = 0
    for row in range(rows):
        for col in range(cols):
            x = col
            y = row
            lon = convert_transform_to_lon(a, b, c, x, y)
            lat = convert_transform_to_lat(d, e, f, x, y)
            elev = elevations[row, col]
            lon_lat_elev[idx] = (lon, lat, elev)
            idx += 1
    
    return lon_lat_elev

@njit
def sort_by_elevation(points):
    return points[np.argsort(points[:, 2])]

@njit
def select_top_points(points, num_points, min_distance):
    top_points = []
    for i in range(len(points)):
        if len(top_points) >= num_points:
            break
        lon, lat, elev = points[i]
        too_close = False
        for j in range(len(top_points)):
            tlon, tlat, _ = top_points[j]
            if measure_distance_between_points(lon, tlon, lat, tlat) < min_distance:
                too_close = True
                break
        if not too_close:
            top_points.append((lon, lat, elev))
    
    return np.array(top_points)

@njit
def top_point_selector_compute(elevations, transform, coordinates, num_points, min_distance):
    lon_lat_elev = create_lon_lat_elev_array(elevations, transform)
    filtered_points = filter_points_by_polygon(lon_lat_elev, coordinates)
    sorted_points = sort_by_elevation(filtered_points)
    top_points = select_top_points(sorted_points, num_points, min_distance)
    return top_points
