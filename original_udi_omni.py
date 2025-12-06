import numpy as np
import matplotlib.pyplot as plt


def arctan_correction(num, denum, eps=1e-6):
    arctan_base = np.arctan(num/(denum + eps)) * 180/np.pi
    arctan_corr = arctan_base + \
        ((denum + eps) < 0) * np.sign(num + eps) * 180  # corr = corrected
    return arctan_corr

# Return n_rot, the rotation matrix that rotates the base vectors (n_E, n_H, n_K) to the new orientation defined by az0, elev0, roll
def rotate_base_vectors(az0, elev0, roll):
    # az0, elev0, roll are in degrees
    # output: n_rot (no units)

    alpha_rad = az0 * (np.pi/180)
    beta_rad = elev0 * (np.pi/180)
    gamma_rad = roll * (np.pi/180)

    R_x = np.array([
        [1, 0, 0],
        [0, np.cos(beta_rad), -np.sin(beta_rad)],
        [0, np.sin(beta_rad), np.cos(beta_rad)]
    ])

    R_y = np.array([
        [np.cos(gamma_rad), 0, np.sin(gamma_rad)],
        [0, 1, 0],
        [-np.sin(gamma_rad), 0, np.cos(gamma_rad)]
    ])

    R_z = np.array([
        [np.cos(alpha_rad), -np.sin(alpha_rad), 0],
        [np.sin(alpha_rad), np.cos(alpha_rad), 0],
        [0, 0, 1]
    ])

    R = R_z @ R_x @ R_y
    # n_E = np.array([0, 0, 1]) # elevation unit row vector
    # n_H = np.array([1, 0, 0]) # horizontal unit row vector
    # n_K = np.array([0, 1, 0]) # wave unit row vector

    # R @ (n_E and n_H) as concatenated column vectors
    n_EH_rot = R @ np.array([[0, 1], [0, 0], [1, 0]])
    n_E_rot, n_H_rot = n_EH_rot[:, 0], n_EH_rot[:, 1]

    n_K_rot = np.cross(n_E_rot, n_H_rot)
    n_rot = np.vstack([n_E_rot, n_H_rot, n_K_rot])
    return n_rot


# Return a_hat, the unit vector in the direction of the lookat point defined by az_t, elev_t
def calc_lookat_cartesian(az_t, elev_t):
    # az_t, elev_t are in degrees
    # output: a_hat (no units)

    phi = (90 - az_t.reshape(1, -1)) * np.pi / 180
    theta = (90 - elev_t.reshape(1, -1)) * np.pi / 180

    a_x = np.cos(phi) * np.sin(theta)
    a_y = np.sin(phi) * np.sin(theta)
    a_z = np.cos(theta)
    a_hat = np.vstack([a_x, a_y, a_z])
    return a_hat


# Return az_local, elev_local, the local azimuth and elevation angles in the rotated coordinate system defined by az0, elev0, roll
def compute_local_direction(az0, elev0, roll, az_t, elev_t, eps=1e-6):
    # az0, elev0, roll, az_t, elev_t are in degrees
    # az_local, elev_local are in degrees
    a_hat = calc_lookat_cartesian(az_t, elev_t)
    n_rot = rotate_base_vectors(az0, elev0, roll)

    result = n_rot @ a_hat
    a_E, a_H, a_K = result

    rho = np.sqrt(a_K**2 + a_H**2)

    az_local = np.arctan(a_H / (a_K + eps)) * (180 / np.pi)
    elev_local = np.arctan(a_E / (rho + eps)) * (180 / np.pi)

    return az_local, elev_local


# Check if the local elevation angle is within the path defined by elev_width
def is_in_path(elev_width, elev_local):
    return np.abs(elev_local) < (elev_width / 2)


# Return the pass score, which is the average absolute value of the local elevation angle
def pass_score(elev_local):
    return np.mean(np.abs(elev_local))


# For optimization only
def compute_local_direction_v2(az0, elev0, roll, a_hat, eps=1e-6):
    # az0, elev0, roll are in degrees
    # a_hat is a 3xN matrix
    # the same as compute_local_direction but with a_hat as input instead of az_t, elev_t since I call 'calc_lookat_cartesian' in the main function

    n_rot = rotate_base_vectors(az0, elev0, roll)

    a_E, a_H, a_K = n_rot @ a_hat

    rho = np.sqrt(a_K**2 + a_H**2)

    az_local = np.arctan(a_H / (a_K + eps)) * (180 / np.pi)
    elev_local = np.arctan(a_E / (rho + eps)) * (180 / np.pi)

    return az_local, elev_local

# For a single (az0, elev0) pair only


# Check if the local elevation angle is within the path defined by elev_width
def is_in_omni(az0, elev0, roll, elev_width, az_t, elev_t):
    _, elev_local = compute_local_direction(az0, elev0, roll, az_t, elev_t)
    elev_local = np.squeeze(elev_local)
    return is_in_path(elev_width, elev_local)


def optimize_angle(az_range, elev_range, roll, elev_width, az_target, elev_target):
    az_vals, elev_vals = np.meshgrid(az_range, elev_range)
    best_coverage = 0
    best_direction = (None, None)
    best_avg_distance = np.pi

    a_hat = calc_lookat_cartesian(az_target, elev_target)

    for az0, elev0 in zip(az_vals.flatten(), elev_vals.flatten()):
        _, elev_local = compute_local_direction_v2(az0, elev0, roll, a_hat)
        elev_local = np.squeeze(elev_local)
        coverage = np.mean(is_in_path(elev_width, elev_local))
        average_distance = pass_score(elev_local)
        if coverage > best_coverage or (coverage == best_coverage and average_distance < best_avg_distance):
            best_coverage = coverage
            best_avg_distance = average_distance
            best_direction = (az0, elev0)

    return best_coverage, best_direction, best_avg_distance


az0, elev0 = 0, 30
elev_width = 20
roll = 0
az_t, elev_t = (
    np.array([0, 0, 0, 90, 90, 90, 180, 180, 180]),
    np.array([-30, 0, 30, -30, 0, 30, -30, 0, 30])
)

b = is_in_omni(az0, elev0, roll, elev_width, az_t, elev_t)
print(b)
# output: array([False, False, True, False, True, False, True, False, False])

# az_target, elev_target = np.array([0, 1, 40]), np.array([0, 20, 0.00])
az_t, elev_t = np.array([180]), np.array([10])

_, elev_local = compute_local_direction(az0, elev0, roll, az_t, elev_t)
elev_local = np.squeeze(elev_local)
a = is_in_path(elev_width, elev_local)
print(a)

az_range = np.arange(0, 360)
elev_range = np.arange(-90, 90+1)
az_width, elev_width = 40, 20
roll = 0

sigma = (20, 5)
n_target = 1000
target_mean = (60, -5)
az_target, elev_target = (
    sigma[0] * np.random.randn(n_target) + target_mean[0],
    sigma[1] * np.random.randn(n_target) + target_mean[1]
)

optimize_angle(az_range, elev_range, elev_width, roll, az_target, elev_target)
