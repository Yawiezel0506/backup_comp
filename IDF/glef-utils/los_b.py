import numpy as np
from skimage.draw import line

def compute_los(elevations: np.ndarray):
    height, width = elevations.shape
    center_y, center_x = height // 2, width // 2
    
    los_results = np.full((height, width), False)
    
    for y in range(height):
        for x in range(width):
            if (x, y) == (center_x, center_y):
                continue
            if is_los(elevations, center_x, center_y, x, y):
                los_results[y, x] = True
            
    image_data = np.zeros((height, width, 4), dtype=np.uint8)
    image_data[los_results == 1] = [0, 255, 0, 255]
    
    return image_data

def is_los(elevations, x0, y0, x1, y1):
    height, width = elevations.shape
    
    rr, cc = line(y0, x0, y1, x1)  # Get line coordinates
    rr, cc = np.clip(rr, 0, height - 1), np.clip(cc, 0, width - 1)

    line_elevations = elevations[rr, cc]
    start_elevation = elevations[y0, x0] + 5

    distances = np.sqrt((cc - x0) ** 2 + (rr - y0) ** 2) * 10
    max_distance = np.max(distances)
    end_elevation = elevations[y1, x1] + 5
    expected_elevations = start_elevation + (distances / max_distance) * (end_elevation - start_elevation)

    return np.all(line_elevations <= expected_elevations)