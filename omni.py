import numpy as np
from numba import njit, prange

@njit
def rotate_base_vectors_numba(az0, elev0, roll):
    alpha_rad = az0 * (np.pi/180)
    beta_rad = elev0 * (np.pi/180)
    gamma_rad = roll * (np.pi/180)

    R_x = np.array([
        [1.0, 0.0, 0.0],
        [0.0, np.cos(beta_rad), -np.sin(beta_rad)],
        [0.0, np.sin(beta_rad), np.cos(beta_rad)]
    ], dtype=np.float64)

    R_y = np.array([
        [np.cos(gamma_rad), 0.0, np.sin(gamma_rad)],
        [0.0, 1.0, 0.0],
        [-np.sin(gamma_rad), 0.0, np.cos(gamma_rad)]
    ], dtype=np.float64)

    R_z = np.array([
        [np.cos(alpha_rad), -np.sin(alpha_rad), 0.0],
        [np.sin(alpha_rad), np.cos(alpha_rad), 0.0],
        [0.0, 0.0, 1.0]
    ], dtype=np.float64)

    R = R_z @ R_x @ R_y

    n_E_rot = R @ np.array([0.0, 0.0, 1.0], dtype=np.float64)
    n_H_rot = R @ np.array([1.0, 0.0, 0.0], dtype=np.float64)
    n_K_rot = np.cross(n_E_rot, n_H_rot)

    n_rot = np.empty((3, 3), dtype=np.float64)
    n_rot[0, :] = n_E_rot
    n_rot[1, :] = n_H_rot
    n_rot[2, :] = n_K_rot

    return n_rot

@njit
def calc_lookat_cartesian_numba(az_t, elev_t):
    phi = (90.0 - az_t) * np.pi / 180.0
    theta = (90.0 - elev_t) * np.pi / 180.0

    a_x = np.cos(phi) * np.sin(theta)
    a_y = np.sin(phi) * np.sin(theta)
    a_z = np.cos(theta)
    a_hat = np.array([a_x, a_y, a_z], dtype=np.float64)
    return a_hat

@njit
def compute_local_direction_numba(az0, elev0, roll, az_t, elev_t, eps=1e-6):
    a_hat = calc_lookat_cartesian_numba(az_t, elev_t)
    n_rot = rotate_base_vectors_numba(az0, elev0, roll)

    result = n_rot @ a_hat
    a_E, a_H, a_K = result[0], result[1], result[2]

    rho = np.sqrt(a_K**2 + a_H**2)

    az_local = np.arctan(a_H / (a_K + eps)) * (180.0 / np.pi)
    elev_local = np.arctan(a_E / (rho + eps)) * (180.0 / np.pi)

    return az_local, elev_local


@njit(parallel=True)
def create_4d_elev_local():
    az_antenna_bins = 360
    elev_antenna_bins = 180
    az_target_bins = 360
    elev_target_bins = 180

    elev_local_4d = np.empty((az_antenna_bins, elev_antenna_bins, az_target_bins, elev_target_bins), dtype=np.float32)

    for az0 in prange(az_antenna_bins):
        for elev0 in range(elev_antenna_bins):
            az0_deg = float(az0)
            elev0_deg = float(elev0 - 90)  # shift elevation to -90 to 89
            for az_t in range(az_target_bins):
                for elev_t in range(elev_target_bins):
                    elev_t_deg = float(elev_t - 90)  # shift elevation to -90 to 89
                    _, elev_local = compute_local_direction_numba(az0_deg, elev0_deg, 0.0, float(az_t), elev_t_deg)
                    elev_local_4d[az0, elev0, az_t, elev_t] = elev_local
    return elev_local_4d


import h5py

elev_local_4d = create_4d_elev_local()
with h5py.File('elev_local_4d.h5', 'w') as f:
    f.create_dataset('elev_local', data=elev_local_4d, compression='gzip')
# This code creates a 4D array of local elevation angles based on antenna and target azimuth and elevation angles.