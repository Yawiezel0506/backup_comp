from typing import List

from pydantic import BaseModel

class CoordinateModel(BaseModel):
    lat: float
    lon: float


class PolygonModel(BaseModel):
    type: str
    coordinates: CoordinateModel