from shapely import Polygon, Point

from app.classes.elevation_classes import PolygonCoordinates

import numpy as np
import matplotlib.pyplot as plt


def transform_polygon_coordinates_to_shapely_format(coordinates: PolygonCoordinates):
    try:
        shapely_polygon = Polygon(coordinates)
        minx, miny, maxx, maxy = shapely_polygon.bounds

        x = np.arange(np.floor(minx * 10000), np.ceil(maxx * 10000) + 1) / 10000
        y = np.arange(np.floor(miny * 10000), np.ceil(maxy * 10000) + 1) / 10000
        xx, yy = np.meshgrid(x, y)

        if xx.shape != yy.shape:
            raise ValueError("X and Y must be the same")
        
        points = np.vstack((xx.ravel(), yy.ravel())).T

        mask = np.array([shapely_polygon.contains(Point(p)) for p in points])

        coords_inside_polygon = points[mask].tolist()

        return coords_inside_polygon
    except Exception as e:
        print("Error during polygon calculation - " + str(e))