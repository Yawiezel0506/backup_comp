import os

import dotenv
import urllib3
import uvicorn
from fastapi import FastAPI

from app.api.altitude import router as altitude_router

dotenv.load_dotenv()

app = FastAPI()
urllib3.disable_warnings()

app.incloude_router(altitude_router)

PORT = int(os.getenv('PORT',3134))

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=PORT)