def get_polygon_bounds(polygon_coordinates: PolygonCoordinates) -> tuple:
    shapely_polygon = Polygon(polygon_coordinates)
    min_lon, min_lat, max_lon, max_lat = shapely_polygon.bounds
    extent = list(shapely_polygon.bounds)
    return min_lon, min_lat, max_lon, max_lat, extent