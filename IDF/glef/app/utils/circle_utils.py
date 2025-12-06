import os
from typing import Tuple, List

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import rasterio
from geopy.distance import great_circle

from app.files_handler.get_point_elevation import get_point_elevation_from_file


def generate_circle_coordinates(center: list[float], radius: float, num_points: int = 100) -> list[tuple[float, float]]:
    lat, lon = center
    angles = np.linspace(0, 2 * np.pi, num_points)
    circle_points = [(lon + radius * np.cos(angle), lat + radius * np.sin(angle)) for angle in angles]
    return circle_points

def meters_to_degrees(meters: float, latitude: float) -> Tuple[float, float]:
    lat_degree : float = meters / 111000
    lon_degree : float = meters / (111000 * np.cos(latitude))
    return lat_degree, lon_degree

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    return great_circle((lat1, lon1), (lat2, lon2)).meters

def interpolate_elevations(lat1: float, lon1: float, lat2: float, lon2: float, dataset, num_points=100)-> List[float]:
    lats = np.linspace(lat1, lon1, num=num_points)
    longs = np.linspace(lat2, lon2, num=num_points)
    elevations = []
    for lat, lon in zip(lats, longs):
        elev = get_point_elevation_from_file(lon, lat, dataset)
        if elev is not None:
            elevations.append(elev)
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
        excepted_elev: float
        if distances[-1] == 0:
            excepted_elev = center_elev
        else:
            excepted_elev = center_elev + (point_elev - center_elev) * (dist / distances[-1])
        
        if elev is not None and elev > excepted_elev:
            return False
    
    return True


def generate_point_inside_circle(center: list[float], radius: float, resolution: int = 10, precision: int = 5):
    center_lat, center_lon = center[0], center[1]
    
    lat_resolution, lon_resolution = meters_to_degrees(resolution, center_lat)
    radius_lat, radius_lon = meters_to_degrees(radius, center_lat)
    
    lat_range = np.arange(center_lat - radius_lat, center_lat + radius_lat, lat_resolution)
    lon_range = np.arange(center_lon - radius_lon, center_lon + radius_lon, lon_resolution)
    
    lat_grid, lon_grid = np.meshgrid(lat_range, lon_range)
    
    lat_grid_flat, lon_grid_flat = lat_grid.flatten(), lon_grid.flatten()
    
    distances = np.array([haversine_distance(center_lat, center_lon, lat, lon) for lat, lon in zip(lat_grid_flat, lon_grid_flat)])
    
    within_circle = distances <= radius
    
    lat_within_circle = np.round(lat_grid_flat[within_circle], precision)
    lon_within_circle = np.round(lon_grid_flat[within_circle], precision)
    
    if len(lat_within_circle) != len(lon_within_circle):
        raise ValueError('error')
    
    coordinates = list(set(zip(lat_within_circle, lon_within_circle)))
    
    results = []
    
    raster_file_path = os.getenv('RASTER_FILE_PATH')
    try:
        with rasterio.open(raster_file_path) as dataset:
            center_elev = get_point_elevation_from_file(center_lon, center_lat, dataset)
            for lat, lon in coordinates:
                elevation = get_point_elevation_from_file(lon, lat, dataset)
                los = check_los(center_lat, center_lon, center_elev, lat, lon, elevation, dataset)
                results.append((lat, lon, elevation, lon))
    except Exception as e:
        print(f"error retrieving point elevation: {e}")
        results = []
    
    df_coordinates = pd.DataFrame({
        'lon': lon_within_circle,
        'lat': lat_within_circle,
    })
    
    plt.scatter(df_coordinates['lon'], df_coordinates['lat'])
    plt.xlabel('LON')
    plt.ylabel('LAT')
    plt.show()
    return results


