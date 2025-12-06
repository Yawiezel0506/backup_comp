import numpy as np
import rasterio
from rasterio.windows import Window

def meters_to_degrees(meters: float, latitude: float) -> Tuple[float, float]:
    lat_degree = meters / 111000
    lon_degree = meters / (111000 * np.cos(np.radians(latitude)))
    return lat_degree, lon_degree

def haversine_distance(lat1: float, lon1: float, lat2: np.ndarray, lon2: np.ndarray) -> np.ndarray:
    # Convert latitude and longitude to radians
    lat1, lon1, lat2, lon2 = map(np.radians, (lat1, lon1, lat2, lon2))
    
    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat / 2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2)**2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    distance = 6371000 * c  # Radius of Earth in meters
    return distance

def get_point_elevation_from_file(lon, lat, dataset):
    try:
        if dataset is None:
            raise ValueError("No dataset")
        row, col = dataset.index(lon, lat)
        window = Window(col_off=col, row_off=row, width=1, height=1)
        data = dataset.read(1, window=window)
        height = data[0, 0]
        return int(height)
    except Exception as e:
        print(f"Error fetching elevation for point ({lon}, {lat}): {e}")
        return None

def get_elevations_from_points(lons: np.ndarray, lats: np.ndarray, dataset) -> np.ndarray:
    """
    Fetch elevations for multiple points from the raster dataset.

    Args:
        lons (np.ndarray): Longitudes of the points.
        lats (np.ndarray): Latitudes of the points.
        dataset: Raster dataset object.

    Returns:
        np.ndarray: Elevations corresponding to the points.
    """
    elevations = np.full(lons.shape, np.nan)
    for i in range(len(lons)):
        lon, lat = lons[i], lats[i]
        try:
            row, col = dataset.index(lon, lat)
            window = Window(col, row, 1, 1)
            data = dataset.read(1, window=window)
            elevations[i] = data[0, 0]
        except Exception as e:
            print(f"Error fetching elevation for point ({lon}, {lat}): {e}")
    return elevations

def check_los(center_lat, center_lon, center_elev, point_lat, point_lon, point_elev, dataset) -> bool:
    num_points = 100
    lats = np.linspace(center_lat, point_lat, num=num_points)
    longs = np.linspace(center_lon, point_lon, num=num_points)
    distances = np.linspace(0, haversine_distance(center_lat, center_lon, point_lat, point_lon), num=num_points)
    
    for lon, lat, dist in zip(lats, longs, distances):
        if (lon, lat) == (center_lon, center_lat) or (lon, lat) == (point_lon, point_lat):
            continue
        
        elev = get_point_elevation_from_file(lon, lat, dataset)
        excepted_elev = center_elev + (point_elev - center_elev) * (dist / distances[-1])
        
        if elev is not None and elev > excepted_elev:
            return False
    
    return True

def generate_grid_points_within_circle(center: list[float], radius: float, resolution: int = 10, precision: int = 5):
    """
    Generates grid points within a circle defined by a center point and radius.
    
    Args:
        center (list[float]): Center point of the circle as [latitude, longitude].
        radius (float): Radius of the circle in meters.
        resolution (int): Grid resolution in meters.
        precision (int): Precision for rounding latitude and longitude.

    Returns:
        Tuple[np.ndarray, np.ndarray]: Arrays of latitudes and longitudes within the circle.
    """
    center_lat, center_lon = center
    
    # Convert resolution and radius from meters to degrees
    lat_resolution, lon_resolution = meters_to_degrees(resolution, center_lat)
    radius_lat, radius_lon = meters_to_degrees(radius, center_lat)
    
    # Generate latitude and longitude ranges
    lat_range = np.arange(center_lat - radius_lat, center_lat + radius_lat + lat_resolution, lat_resolution)
    lon_range = np.arange(center_lon - radius_lon, center_lon + radius_lon + lon_resolution, lon_resolution)
    
    # Create a meshgrid
    lat_grid, lon_grid = np.meshgrid(lat_range, lon_range)
    
    # Flatten the grids
    lat_grid_flat = lat_grid.flatten()
    lon_grid_flat = lon_grid.flatten()
    
    # Calculate distances from the center point
    distances = haversine_distance(center_lat, center_lon, lat_grid_flat, lon_grid_flat)
    
    # Filter points within the circle
    within_circle = distances <= radius
    
    # Round latitudes and longitudes
    lat_within_circle = np.round(lat_grid_flat[within_circle], precision)
    lon_within_circle = np.round(lon_grid_flat[within_circle], precision)
    
    return lat_within_circle, lon_within_circle

def process_coordinates_with_raster(coordinates: np.ndarray, raster_file_path: str) -> list:
    """
    Process coordinates to check line-of-sight and get elevations.

    Args:
        coordinates (np.ndarray): Array of coordinates as [lat, lon].
        raster_file_path (str): Path to the raster file.

    Returns:
        list: List of tuples containing lat, lon, elevation, and LOS status.
    """
    results = []
    
    try:
        with rasterio.open(raster_file_path) as dataset:
            center_lat, center_lon = coordinates[0]  # Assume the center is the first coordinate
            center_elev = get_point_elevation_from_file(center_lon, center_lat, dataset)
            
            lons = np.array([lon for _, lon in coordinates])
            lats = np.array([lat for lat, _ in coordinates])
            
            elevations = get_elevations_from_points(lons, lats, dataset)
            
            for (lat, lon), elevation in zip(coordinates, elevations):
                if elevation is not np.nan:
                    los = check_los(center_lat, center_lon, center_elev, lat, lon, elevation, dataset)
                    results.append((lat, lon, elevation, los))
    except Exception as e:
        print(f"Error retrieving point elevation: {e}")
    
    return results

# Example usage
center = [40.7128, -74.0060]  # Example center point (latitude, longitude)
radius = 1000  # Example radius in meters
resolution = 10  # Example resolution in meters
precision = 5  # Example precision

lat_within_circle, lon_within_circle = generate_grid_points_within_circle(center, radius, resolution, precision)
coordinates = np.array(list(zip(lat_within_circle, lon_within_circle)))  # Convert to np.ndarray

raster_file_path = os.getenv('RASTER_FILE_PATH')
results = process_coordinates_with_raster(coordinates, raster_file_path)

print(results)
