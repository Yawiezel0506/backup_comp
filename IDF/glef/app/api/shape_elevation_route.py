from fastapi import APIRouter

from app.utils.circle_utils import generate_point_inside_circle
from app.models.elevation_models import CircleModel
from app.logger.custom_logger import logger

router = APIRouter()

@router.post("/circle-elevation")
def circle_elevation(circle: CircleModel):
    try:
        coords_inside_circle = generate_point_inside_circle(circle.center, circle.radius)
        
        return {
            "data": {
                "circleCoordinates": coords_inside_circle
            }
        }
    except Exception as e:
        logger.error(f"Error: {e}")