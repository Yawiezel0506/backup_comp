import os

import dotenv
import urllib3
import uvicorn

from app.api.base_route import router as base_router
from app.api.elevation_route import router as elevation_route
from app.constants.general import PORT_ENV, PORT_NUM, HOST, API_PREFIX
from app.constants.messages import INIT_SERVER_MESSAGE
from app.create_app import create_app
from app.logger.custom_logger import logger
from app.middleware.setup_middleware import setup_middleware

PORT = int(os.getenv(PORT_ENV,PORT_NUM))

dotenv.load_dotenv()

app = create_app()
urllib3.disable_warnings()

setup_middleware(app)

app.incloude_router(base_router)
app.incloude_router(elevation_route, prefix=API_PREFIX)

if __name__ == '__main__':
    logger.info(INIT_SERVER_MESSAGE)

    log_config = uvicorn.config.LOGGING_CONFIG
    log_config['loggers']['uvicorn.access']['handlers'] = []

    uvicorn.run(app, host=HOST, port=PORT, log_config=log_config)