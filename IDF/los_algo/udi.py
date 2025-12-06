import numpy as np
import matplotlib.pyplot as plt

def calculate_azimuth(lon_a_deg, lat_a_deg, lon_b_deg, lat_b_deg):
    lat_a, lon_a = np.radians([lat_a_deg, lon_a_deg])
    lat_b, lon_b = np.radians([lat_b_deg, lon_b_deg])
    
    d_lat = lat_b - lat_a
    d_lon = lon_b - lon_a
    
    azimuth_rad = np.arctan2(np.sin(d_lon) * np.cos(lat_b),
                              np.cos(lat_a) * np.sin(lat_b) - np.sin(lat_a) * np.cos(lat_b) * np.cos(d_lon))

    return azimuth_rad


def angular_distance(lon_a_deg, lat_a_deg, lon_b_deg, lat_b_deg):
    lat_a, lon_a = np.radians([lat_a_deg, lon_a_deg])
    lat_b, lon_b = np.radians([lat_b_deg, lon_b_deg])
    
    angular_distance_rad = np.arccos(np.sin(lat_a) * np.sin(lat_b) + np.cos(lon_a - lon_b)* np.cos(lat_a) * np.cos(lat_b))
    
    return angular_distance_rad

def angular_distance_cannon(lon_deg, lat_deg):
    lat, lon = np.radians([lat_deg, lon_deg])
    angular_dist_rad = np.arccos(np.cos(lon) * np.cos(lat))
    return angular_dist_rad

def ellipse_distance(a, b, t):
    t = np.pi/2 - t
    tan_squared_t = np.tan(t)**2
    a_squared = a ** 2
    b_squared = b ** 2
    x = np.sqrt(a_squared*b_squared/(b_squared + a_squared * tan_squared_t))
    y = np.sqrt(a_squared* b_squared*tan_squared_t/(b_squared+a_squared*tan_squared_t))
    return angular_distance_cannon(x, y)

def is_in_ellipse_v1(az0, elev0, az_width, elev_width, roll, az_target, elev_target, num_point=360):
    t = np.linspace(-np.pi, np.pi, num_point+1)
    ellipse_dist = ellipse_distance(a=az_width/2, b=elev_width/2, t=t)
    roll_indices = int(roll/num_point*360)
    ellipse_dist = np.roll(ellipse_dist, roll_indices)
    target_relative_az = calculate_azimuth(az0, elev0, az_target, elev_target)
    target_distance_req = np.interp(target_relative_az, t, ellipse_dist)
    target_angular_distance = angular_distance(az0, elev0, az_target, elev_target)
    return np.round(target_angular_distance, 6) <= np.round(target_distance_req, 6)

def is_in_ellipse_v2(az0, elev0, t, ellipse_dist, az_target, elev_target):
    target_relative_az = calculate_azimuth(az0, elev0, az_target, elev_target)
    target_distance_req = np.interp(target_relative_az, t, ellipse_dist)
    target_angular_distance = angular_distance(az0, elev0, az_target, elev_target)
    is_in = np.round(target_angular_distance, 6) <= np.round(target_distance_req, 6)
    avarage_distance = np.mean(target_angular_distance[is_in])
    return np.mean(is_in), avarage_distance


def optimize_angle(az_range, elev_range, az_width, elev_width, roll, az_target, elev_target, num_points=360):
    t = np.linspace(-np.pi, np.pi, num_points+1)
    ellipse_dist = ellipse_distance(a=az_width/2, b=elev_width/2, t=t)
    roll_indices = int(roll/num_points*360)
    ellipse_dist = np.roll(ellipse_dist, roll_indices)
    
    az_vals, elev_vals = np.meshgrid(az_range, elev_range)
    best_coverage = 0
    best_direction = (None, None)
    best_avarage_distance = np.pi
    
    for az0, elev0 in zip(az_vals.flatten(), elev_vals.flatten()):
        coverage, avarage_distance = is_in_ellipse_v2(az0, elev0, t, ellipse_dist, az_target, elev_target)
        if coverage > best_coverage:
            best_coverage = coverage
            best_direction = (az0, elev0)
            best_avarage_distance = avarage_distance
    best_coverage, best_direction, best_avarage_distance*180/np.pi
    
    
    az_0, elev_0 = 0, 0
    az_width, elev_width = 40, 20
    roll = -45
    az_target, elev_target = 10, 10
    is_in_ellipse_v1(az0, elev0, az_width, elev_width, roll, az_target, elev_target, 360)
    
    n_points = 360
    az_range = np.arange(0, 360)
    elev_range = np.arange(-90, 90+1)
    az_width, elev_width = 40, 20
    roll = 0
    sigma = (20, 5)
    n_target = 1000
    target_mean = (60, -5)
    az_target, elev_target = sigma[0]*np.random.randn(n_target)+target_mean[0], sigma[1]*np.random.randn(n_target)+target_mean[1]
    optimize_angle(az_range, elev_range, az_width, elev_width, roll, az_target, elev_target, 360)