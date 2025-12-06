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



def create_virtual_sphere(
    filename, tx_res_lat=180, tx_res_lon=360, rx_res_lat=180, rx_res_lon=360
):
    # Create a 3D grid of latitude and longitude
    tx_lat, tx_lon = np.meshgrid(np.linspace(-90, 90, tx_res_lat), np.linspace(-180, 180, tx_res_lon))
    rx_lat, rx_lon = np.meshgrid(np.linspace(-90, 90, rx_res_lat), np.linspace(-180, 180, rx_res_lon))

    rx_lat_grid, rx_lon_grid = np.meshgrid(rx_lat, rx_lon, indexing='ij')
    
    full_shape = (tx_res_lat, tx_res_lon, rx_res_lat, rx_res_lon)
    
    with h5py.open(filename, 'w') as f:
        dset_ang = f.create_dataset(
            'angular_distances', shape=full_shape, dtype='float32',
            chunks=(1, 1, rx_res_lat, rx_res_lon),
            compression='gzip',
            compression_opts=9
        )
        
        dset_az = f.create_dataset(
            'az_relative', shape=full_shape, dtype='float32',
            chunks=(1, 1, rx_res_lat, rx_res_lon),
            compression='gzip',
            compression_opts=9
        )
        
        for i, tx_lat_val in enumerate(tx_lat):
            for j, tx_lon_val in enumerate(tx_lon):
                lat1, lon1 = tx_lat_val, tx_lon_val
                angular_distances = calculate_angular_distances(lat1, lon1, rx_lat_grid, rx_lon_grid)
                az_relative = calculate_azimuth(lat1, lon1, rx_lat_grid, rx_lon_grid)
                dset_ang[i, j, :, :] = angular_distances
                dset_az[i, j, :, :] = az_relative
    
    
    print('Virtual sphere data saved to:', filename)



create_virtual_sphere('sphere.hdf5')