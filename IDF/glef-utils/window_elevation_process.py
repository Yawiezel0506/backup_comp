def window_elevation_process(polygon: WindowPolygon) -> dict:
    min_lon, min_lat, max_lon, max_lat, extent = get_polygon_bounds(polygon.coordinates)
    window_coordinates = get_window_elevations_from_file(min_lon, max_lon, min_lat, max_lat)
    if window_coordinates.size == 0:
        raise ValueError('polygon area out of file range')
    color_image, color_legend = transform_to_color_map_data(window_coordinates)
    img_str = encode_image_data_to_base64(color_image)
    return {
        "extent": extent,
        "location": [polygon.coordinates],
        "resolution": 10,
        "colorLegend": color_legend,
        "img": img_str
    }