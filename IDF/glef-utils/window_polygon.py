class WindowPolygon(BaseModel):
    coordinates: list[list[float]]
    
    @validator('coordinates')
    def validate_coordinates(cls, v):
        if len(v) != 5:
            raise ValueError('Invalid coordinates')
        for coord in v:
            if len(coord) != 2:
                raise ValueError('Invalid coordinates')
        return v