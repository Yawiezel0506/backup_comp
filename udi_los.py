#script for initializing the virtual sphere dile

@njit
def angular_distance(lat1, lon1, lat2, lon2):
    lat1, lon1 = np.radians(lat1), np.radians(lon1)
    lat2, lon2 = np.radians(lat2), np.radians(lon2)
    angular_dust_rad = np.arccos(
        np.sin(lat1) * np.sin(lat2) + 
        np.cos(lon1 - lon2) * np.cos(lat1) * np.cos(lat2)
        )
    return angular_dust_rad

@njit
def calculate_azimuth(lat1, lon1, lat2, lon2):
    lat1, lon1 = np.radians(lat1), np.radians(lon1)
    lat2, lon2 = np.radians(lat2), np.radians(lon2)
    d_lon = lon2 - lon1
    azimuth_rad = np.arctan2(
        np.sin(d_lon) * np.cos(lat2), 
        np.cos(lat1) * np.sin(lat2) - np.sin(lat1) * np.cos(lat2) * np.cos(d_lon)
    
    )
    return azimuth_rad


@njit
def angular_dist_cannon(lon_deg, lat_deg):
    lon, lat = np.radians([lon_deg, lat_deg])
    angular_dist_cannon_rad = np.arccos(np.cos(lon) *  np.cos(lat))
    return angular_dist_cannon_rad


def create_sphere_grid(num_azimuth=360, num_elevation=180):
    azimuth_grid = np.linspace(0, 2 * np.pi, num_azimuth, endpoint=False)
    elevation_grid = np.linspace(-np.pi / 2, np.pi / 2, num_elevation)
    return np.meshgrid(azimuth_grid, elevation_grid)


@njit(parallel=True)
def compute_beam_pattern(az_grid, el_grid):
    num_azimuth, num_elevation = az_grid.shape
    
    angular_distances = np.zeros((num_elevation, num_azimuth, num_elevation, num_azimuth))
    az_relative = np.zeros((num_elevation, num_azimuth, num_elevation, num_azimuth))
    
    for i in prange(num_elevation):
        for j in prange(num_azimuth):
            lat1, lon1 = el_grid[i, j], az_grid[i, j]
            for k in prange(num_elevation):
                for l in prange(num_azimuth):
                    lat2, lon2 = el_grid[k, l], az_grid[k, l]
                    angular_distances[i, j, k, l] = angular_distance(lat1, lon1, lat2, lon2)
                    az_relative[i, j, k, l] = calculate_azimuth(lat1, lon1, lat2, lon2)
    
    return angular_distances, az_relative


def save_to_hdf5(filename, azimuths, elevations, angular_dists, az_relative):
    with h5py.File(filename, 'w') as hf:
        hf.create_dataset('azimuths', data=azimuths)
        hf.create_dataset('elevations', data=elevations)
        hf.create_dataset('angular_distances', data=angular_dists)
        hf.create_dataset('az_relative', data=az_relative)


def main():
    num_azimuth = 360
    num_elevation = 180
    azimuth_grid, elevation_grid = create_sphere_grid(num_azimuth, num_elevation)
    angular_distances, az_relative = compute_beam_pattern(azimuth_grid, elevation_grid)

    azimuths = azimuth_grid.flatten()
    elevations = elevation_grid.flatten()

    save_to_hdf5('virtual_sphere_dile.h5', azimuths, elevations, angular_distances, az_relative)