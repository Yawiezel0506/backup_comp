@njit
def is_have_los(
    heights, start_coords, start_indices, dest_indices, start_height, dest_height, line_distance,
    transform, k_factor
):
    height, width = height.shape
    start_lon, start_lat = start_coords
    start_y, start_x = start_indices
    dest_y, dest_x = dest_indices
    
    rr, cc = bresenham_line(start_y, start_x, dest_y, dest_x)
    rr, cc = np.clip(rr, 0, height - 1), np.clip(cc, 0, width - 1)
    
    for i in range(len(rr)):
        r, c = rr[i], cc[i]
        step_height = heights[r, c]
        step_lon, step_lat = convert_index_to_coords(transform, c, r)
        dist = haversine_distance(start_lat, start_lon, step_lat, step_lon)
        expected_elevation = start_height + (dist / line_distance) * (dest_height - start_height)
        
        ajusted_elevation = adjust_elevation_with_k(step_height, dist, k_factor)
        
        if ajusted_elevation > expected_elevation:
            return False, (step_lon, step_lat)
    return True, None


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
def adjust_elevation_with_k(elev, distance, k_factor, earth_radius=6371000):
    """
    Adjust elevation for Earth's curvature and atmospheric refraction.

    Parameters:
    - elev: Elevation in meters.
    - distance: Distance from the start point in meters.
    - k_factor: Earth's refraction constant.
    - earth_radius: Earth's radius in meters (default: 6371 km).

    Returns:
    - Adjusted elevation in meters.
    """
    return elev - (distance ** 2) / (2 * k_factor * earth_radius)


@njit
def haversine_distance(lat1, lon1, lat2, lon2):
    radius = 6371000  # Earth's radius in meters
    lat1, lat2 = np.radians(lat1), np.radians(lat2)
    lon1, lon2 = np.radians(lon1), np.radians(lon2)
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    return radius * c


