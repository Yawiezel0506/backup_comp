@app.post('/api/point-elevation-ws')
async def handle_point_elevation_websocket(websocket: WebSocket, response: Response):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_json()
                
                await websocket.send_json({'elevation': elevation})
        except Exception as e:
            logger.error(f"Error occurred while processing elevation request: {e}")