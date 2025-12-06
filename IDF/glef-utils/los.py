import numpy as np
from PIL import Image
import io
import base64

def calculate_normalized_vectors(dx, dy, distances):

    # Normalize direction vectors
    with np.errstate(divide='ignore', invalid='ignore'):
        dx_normalized = np.divide(dx, distances, out=np.zeros_like(dx, dtype=np.float64), where=distances != 0)
        dy_normalized = np.divide(dy, distances, out=np.zeros_like(dy, dtype=np.float64), where=distances != 0)

    return dx_normalized, dy_normalized

def los_heatmap_calculation(elevations: np.ndarray, adv_target: int, adv_dest: int):
    grid_height, grid_width = elevations.shape
    target_x, target_y = grid_width // 2, grid_height // 2
    target_elevation = elevations[target_y, target_x] + adv_target
    
    # Create mesh grids for all coordinates (indexes of grids)
    x_grid, y_grid = np.meshgrid(np.arange(grid_width), np.arange(grid_height))
    
    dx = x_grid - target_x
    dy = y_grid - target_y
    distances = np.sqrt(dx ** 2 + dy ** 2)
    
    # Calculate the direction vectors and distances
    dx_normalized, dy_normalized = calculate_normalized_vectors(dx, dy, distances)
    
    distances_in_meters = distances * 10

    # Compute distances and number of points along each line
    line_lengths = (distances_in_meters).astype(int)  # Convert to meters and integer steps
    
    max_length = line_lengths.max()
    
    # Create an array representing positions along the line (e.g., 0, 1, 2, ..., length)
    positions = np.arange(max_length)
    
    # Compute x and y coordinates for all points along each line at once
    line_x = np.clip(target_x + np.outer(positions, dx_normalized.flatten()).reshape(len(positions), grid_height, grid_width), 0, grid_width - 1).astype(int)
    line_y = np.clip(target_y + np.outer(positions, dy_normalized.flatten()).reshape(len(positions), grid_height, grid_width), 0, grid_height - 1).astype(int)

    # Extract the elevation profiles along all lines in one go
    actual_elevations = elevations[line_y, line_x]
    
    adv_elevations = elevations + adv_dest
    
    height_differences = adv_elevations - target_elevation
    distance_rations = np.linspace(0, 1, max_length)[:, None, None]
    

    # Interpolate the expected elevation profiles
    expected_elevations = target_elevation + height_differences * distance_rations
    
    camulative_max_elevation = np.maximum.accumulate(actual_elevations, axis=0)

    # Perform LOS check
    los_results = np.all(camulative_max_elevation <= expected_elevations, axis=0)
    
    los_results[max(0, target_y - 1):min(grid_height, target_y + 2),
                max(0, target_x - 1):min(grid_width, target_x + 2)] = True
    
    # Create the heatmap image
    image_data = np.zeros((grid_height, grid_width, 4), dtype=np.uint8)
    image_data[los_results == 1] = [0, 255, 0, 255]  # Green for LOS
    image_data[los_results == 0] = [255, 0, 0, 188]  # Red for no LOS
    
    # Encode the image as base64
    img_str = encode_image_data_to_base64(image_data)
    
    return img_str

def encode_image_data_to_base64(img_data: np.ndarray) -> str:
    image = Image.fromarray(img_data)
    buffered = io.BytesIO()
    image.save(buffered, format='JPEG', quality=85, optimize=True)
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return img_str

# Example usage
if __name__ == "__main__":
    elevations = np.random.randint(0, 1000, (100, 100))  # Example elevation data
    los_image_base64 = los_heatmap_calculation(elevations)
    print(los_image_base64)