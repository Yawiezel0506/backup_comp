def calculate_azimuth(lon_a_deg, lat_a_deg, lon_b_deg, lat_b_deg):
    lat_a, lon_a = np.radians([lat_a_deg, lon_a_deg])
    lat_b, lon_b = np.radians([lat_b_deg, lon_b_deg])
    
    d_lat = lat_b - lat_a
    d_lon = lon_b - lon_a
    
    azimuth_rad = np.arctan2(np.sin(d_lon) * np.cos(lat_b),
                              np.cos(lat_a) * np.sin(lat_b) - np.sin(lat_a) * np.cos(lat_b) * np.cos(d_lon))
    
    return np.degrees(azimuth_rad) % 360