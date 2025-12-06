import numpy as np
from numba import njit, prange
from fastapi import APIRouter, HTTPStatus
import rasterio

router = APIRouter()

# Helper function to calculate the Fresnel radius
@njit
def fresnel_radius(frequency, dist1, dist2, zone_number, clearance_ratio):
    """
    Calculate the Fresnel zone radius at a given distance with clearance.

    Parameters:
    - frequency: Frequency in Hz.
    - dist1, dist2: Distances from each endpoint.
    - zone_number: Fresnel zone number (1, 2, 3).
    - clearance_ratio: Portion of the Fresnel zone to use (e.g., 0.6 or 0.8).

    Returns:
    - Fresnel radius with clearance in meters.
    """
    wavelength = 3e8 / frequency  # Speed of light divided by frequency
    full_radius = np.sqrt(zone_number * wavelength * dist1 * dist2 / (dist1 + dist2))
    return clearance_ratio * full_radius  # Apply clearance ratio

# Helper function to adjust elevation based on Earth's curvature and k-factor
@njit
def adjust_elevation_with_k(elev, distance, k_factor, earth_radius=6371000):
    """
    Adjust elevation for Earth's curvature and atmospheric refraction.

    Parameters:
    - elev: Elevation in meters.
    - distance: Distance from the start point in meters.
    - k_factor: Earth's refraction constant.
    - earth_radius: Earth's radius in meters (default: 6371 km).

    Returns:
    - Adjusted elevation in meters.
    """
    return elev - (distance ** 2) / (2 * k_factor * earth_radius)

# Helper function to check if there's RF LOS between two points
@njit
def is_have_rf_los(elevations, center_x, center_y, dest_x, dest_y, center_adv, dest_adv, resolution, frequency, fresnel_zone=1, clearance_ratio=0.6, k_factor=1.33):
    """
    Check if there is RF LOS between two points, considering Fresnel zones and Earth's curvature.

    Parameters:
    - elevations: 2D array of terrain elevations.
    - center_x, center_y: Coordinates of the starting point.
    - dest_x, dest_y: Coordinates of the destination point.
    - center_adv, dest_adv: Heights of antennas at the start and end points.
    - resolution: Map resolution in meters per pixel.
    - frequency: Frequency in Hz.
    - fresnel_zone: Fresnel zone number (default: 1).
    - clearance_ratio: Portion of the Fresnel zone to use (default: 60%).
    - k_factor: Earth's refraction constant (default: 1.33).

    Returns:
    - True if LOS exists, False otherwise.
    """
    height, width = elevations.shape
    rr, cc = bresenham_line(center_y, center_x, dest_y, dest_x)
    rr, cc = np.clip(rr, 0, height - 1), np.clip(cc, 0, width - 1)

    start_elevation = elevations[center_y, center_x] + center_adv
    distances = np.sqrt((cc - center_x) ** 2 + (rr - center_y) ** 2) * resolution
    max_distance = np.max(distances)

    for i in range(len(rr)):
        r, c = rr[i], cc[i]
        line_elevations = elevations[r, c]
        dist = np.sqrt((c - center_x) ** 2 + (r - center_y) ** 2) * resolution
        end_elevation = elevations[dest_y, dest_x] + dest_adv

        # Adjust for Earth's curvature
        adjusted_elev = adjust_elevation_with_k(line_elevations, dist, k_factor)

        # Expected elevation along LOS
        expected_elev = start_elevation + (dist / max_distance) * (end_elevation - start_elevation)

        # Calculate Fresnel radius with clearance
        fresnel_r = fresnel_radius(frequency, dist, max_distance - dist, fresnel_zone, clearance_ratio)

        # Check if obstruction lies within Fresnel zone
        if adjusted_elev > expected_elev - fresnel_r:
            return False

    return True

# Bresenham's line algorithm to get points along the LOS
@njit
def bresenham_line(center_y, center_x, y, x):
    dx = abs(x - center_x)
    dy = abs(y - center_y)
    sx = -1 if center_x > x else 1
    sy = -1 if center_y > y else 1
    err = dx - dy
    
    line_rr = []
    line_cc = []

    while True:
        line_rr.append(center_y)
        line_cc.append(center_x)
        if center_x == x and center_y == y:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            center_x += sx
        if e2 < dx:
            err += dx
            center_y += sy
    return np.array(line_rr), np.array(line_cc)

# Generate the RF LOS polygon heatmap data
@njit(parallel=True)
def compute_rf_los_polygon(elevations, resolution, center_indexes, center_adv, dest_adv, frequency, fresnel_zone, clearance_ratio, k_factor):
    height, width = elevations.shape
    center_x, center_y = center_indexes
    los_map = np.zeros((height, width))

    for y in prange(height):
        for x in prange(width):
            if elevations[y, x] == -32768:
                los_map[y, x] = 2
                continue
            if is_center_or_is_adjacent(center_x, center_y, x, y):
                los_map[y, x] = 1
                continue
            if is_have_rf_los(elevations, center_x, center_y, x, y, center_adv, dest_adv, resolution, frequency, fresnel_zone, clearance_ratio, k_factor):
                los_map[y, x] = 1

    return los_map

# Endpoint to generate RF LOS polygon heatmap
@router.post("rf-los-polygon-heatmap")
async def rf_los_polygon_heatmap(request: RFLosPolygonHeatmapRequest, response):
    try:
        # Validate and set Fresnel zone (default to zone 1)
        fresnel_zone = request.fresnelZone if request.fresnelZone in [1, 2, 3] else 1

        # Validate and set clearance ratio (default to 60%)
        clearance_ratio = 0.8 if request.clearanceRatio == 0.8 else 0.6

        # Validate and set k-factor (default to 1.33)
        k_factor = request.kFactor if request.kFactor else 1.33

        image_data = await rf_los_polygon_process(request, response, fresnel_zone, clearance_ratio, k_factor)
        return image_data
    except Exception as e:
        response.status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        return {"error": str(e)}

# Main processing logic for generating the heatmap
async def rf_los_polygon_process(request: RFLosPolygonHeatmapRequest, response, fresnel_zone, clearance_ratio, k_factor):
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(request.coordinates)
    center_coordinates = request.center

    polygon_area = calc_extent_area(min_lon, min_lat, max_lon, max_lat)

    validate_polygon_size(polygon_area, response)

    raster_file_path = polygon_raster_chooser(structure=True, area=polygon_area)

    with rasterio.open(raster_file_path) as dataset:
        check_start_point(center_coordinates, response, dataset)

        window_elevations, resolution, transform = await get_window_elevations_from_file_with_optimization(
            min_lon, max_lon, min_lat, max_lat, polygon_area, response, dataset
        )

        center_indexes = get_coord_indexes(transform, center_coordinates)

        target_adv, dest_adv = request.originHeight, request.destHeight
        frequency_hz = request.frequency * 1e6  # Convert MHz to Hz

        los_map = compute_rf_los_polygon(
            window_elevations,
            resolution,
            center_indexes,
            target_adv,
            dest_adv,
            frequency_hz,
            fresnel_zone,
            clearance_ratio,
            k_factor
        )

        image_map = generate_image_data(los_map)

        image_str = encode_image_to_base64(image_map)

        return {
            "extent": extent,
            "resolution": resolution,
            "image": image_str,
            "location": [request.coordinates]
        }
