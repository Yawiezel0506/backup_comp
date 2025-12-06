import asyncio
from typing import List, Dict

from fastapi import WebSocket

from app.files_handler.elevation_singleton import ElevationSingleton
from app.logger.custom_logger import logger


class WebSocketManager:
    _active_connections: List[WebSocket] = []
    lock = asyncio.Lock()

    async def connect(self, websocket: WebSocket) -> None:
        async with self.lock:
            await websocket.accept()
            self._add_connection(websocket)
            num_of_connections = self._active_connections_count()
            logger.info(f"num of connections: {num_of_connections} connections")
        
        async def disconnect(self, websocket: WebSocket) -> None:
            async with self.lock:
                self._remove_connection(websocket)
                num_of_connections = self._active_connections_count()
                logger.info(f"num of connections: {num_of_connections} connections")
                if num_of_connections == 0:
                    await ElevationSingleton.shout_down()
        
        async def send_message(self, massage: Dict[str, any], websocket: WebSocket) -> None:
            async with self.lock:
                await websocket.send_json(massage)

        async def broadcast(self, massage: Dict[str, any]) -> None:
            async with self.lock:
                for connection in self._active_connections:
                    await self.send_message(massage, connection)

        @classmethod
        def _add_connection(cls, websocket: WebSocket):
            cls._active_connections.append(websocket)

        @classmethod
        def _remove_connection(cls, websocket: WebSocket):
            cls._active_connections.remove(websocket)

        @classmethod
        def _active_connections_count(cls) -> int:
            return len(cls._active_connections)