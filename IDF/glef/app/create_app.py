from fastapi import FastAPI

from app.constants.general import PROJECT_NAME
from app.logger.custom_logger import logger

def create_app() -> FastAPI:
    app = FastAPI(title=PROJECT_NAME, debug=False)
    app.logger = logger

    return app