import numpy as np
import matplotlib.pyplot as plt

def calculate_azimuth(lat1, lon1, lat2, lon2):
    lat1, lon1 = np.radians([lat1, lon1])
    lat2, lon2 = np.radians([lat2, lon2])
    d_lon = lon2 - lon1
    azimuth_rad = np.arctan2(
        np.sin(d_lon) * np.cos(lat2), 
        np.cos(lat1) * np.sin(lat2) - np.sin(lat1) * np.cos(lat2) * np.cos(d_lon)
    
    )
    return azimuth_rad


def angular_distance(lat1, lon1, lat2, lon2):
    lat1, lon1 = np.radians([lat1, lon1])
    lat2, lon2 = np.radians([lat2, lon2])
    angular_dust_rad = np.arccos(
        np.sin(lat1) * np.sin(lat2) + 
        np.cos(lon1 - lon2) * np.cos(lat1) * np.cos(lat2)
        )
    return angular_dust_rad


def angular_dist_cannon(lon_deg, lat_deg):
    lon, lat = np.radians([lon_deg, lat_deg])
    angular_dist_cannon_rad = np.arccos(np.cos(lon) *  np.cos(lat))
    return angular_dist_cannon_rad


def ellipse_distance(a, b, t):
    t = np.pi / 2 - t
    tan_squared_t = np.tan(t) ** 2
    a_squared = a ** 2
    b_squared = b ** 2
    x = np.sqrt(a_squared * b_squared / (b_squared + a_squared * tan_squared_t))
    y = np.sqrt(b_squared * a_squared * tan_squared_t / (b_squared + a_squared * tan_squared_t))
    return angular_dist_cannon(x, y)

def is_in_ellipse(az0, el0, az_width, el_width, roll, az_target, el_target, n_points=360):
    t = np.linspace(-np.pi, np.pi, n_points+1)
    ellipse_dist = ellipse_distance(az_width / 2, el_width / 2, t)
    roll_indices = int(roll / n_points* 360)
    ellipse_dist = np.roll(ellipse_dist, roll_indices)
    target_relativr_azimuth = calculate_azimuth(az0, el0, az_target, el_target)
    target_distance_req = np.interp(target_relativr_azimuth, t, ellipse_dist)
    target_angular_dist = angular_distance(az0, el0, az_target, el_target)
    return np.round(target_angular_dist, 6) <= np.round(target_distance_req, 6)


if __name__ == "__main__":
    n_points = 360
    az0, el0 = 0, 0  # in degrees
    res = 1
    az_range = np.arange(0, 360, res)
    el_range = np.arange(-90, 91, res)
    
    roll = 0
    az_width, el_width = 40, 40  # in degrees
    az_target, el_target = np.meshgrid(az_range, el_range)  # in degrees
    angular_dist = angular_dist_cannon(az_target, el_target)
    
    t = np.linspace(-np.pi, np.pi, n_points+1)
    ellipse_dist = ellipse_distance(az_width / 2, el_width / 2, t)
    roll_indices = int(roll / n_points* 360)
    ellipse_dist = np.roll(ellipse_dist, roll_indices)
    target_relative_az = calculate_azimuth(az0, el0, az_target, el_target)
    target_distance_req = np.interp(target_relative_az, t, ellipse_dist)
    angular_dist = angular_distance(az0, el0, az_target, el_target)
    is_in = np.round(angular_dist, 6) <= np.round(target_distance_req, 6)
    
    plt.scatter(az_target, el_target, c=is_in)
    plt.axis('equal')
    

