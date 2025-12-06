from fastapi import APIRouter, WebSocket
from starlette.websocket import WebSocketDisconnect


router = APIRouter()

@router.post("/point-elevation")
def point_elevation(coordinate):
    elevation_data = ElevationData()
    height = elevation_data.get_elevation(coordinate)
    return height

@router.websocket("/point-elevation-ws")
async def point_elevation_ws(websocket):
    elevation_data = ElevationData()
    try:
        data = await websocket.receive_json()
        lat, lon = data.get("lat"), data.get("lon")
        coordinate = Coordinate(lat, lon)
        height = elevation_data.get_elevation(coordinate)
        await websocket.send_json({"height": height})
    except WebSocketDisconnected:
        print("Websocket disconnected")