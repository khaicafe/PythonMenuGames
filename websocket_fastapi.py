import asyncio
from typing import List, Dict

import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var client_id = Date.now()
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


class ConnectionManagers:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

# notice: active_connections is changed to a dict (key= ws_token), so we know which user listens to which model
class ConnectionManager:

    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        print(self.active_connections)

    async def connect(self, websocket: WebSocket, ws_token: str):
        await websocket.accept()
        if ws_token in self.active_connections:
            self.active_connections.get(ws_token).append(websocket)
        else:
            self.active_connections.update({ws_token: websocket})

    def disconnect(self, websocket: WebSocket, ws_token: str):
        self.active_connections.get(ws_token).remove(websocket)
        if (len(self.active_connections.get(ws_token)) == 0):
            self.active_connections.pop(ws_token)

    # notice: changed from async to sync as background tasks messes up with async functions
    # def send_message(self, data: dict, ws_token: str):
    # def send_message(self, data: str, ws_token: str):
    async def send_message(self, data: str, ws_token: str):
        sockets = self.active_connections.get(ws_token)
        print(f"ws_token: {ws_token} data {data} sockets {sockets} \n")
        await sockets.send_text(data)
        # if sockets:
        #     # notice: socket send is originally async. We have to change it to syncronous code -
        #     loop = asyncio.new_event_loop()
        #     asyncio.set_event_loop(loop)
        #     for socket in sockets:
        #         socket.send_text
        #         loop.run_until_complete(socket.send_json(data))

manager = ConnectionManager()
@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    print('socket_user: ', websocket)
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            # await manager.send_personal_message(f"You wrote: {data}", websocket)
            # await manager.broadcast(f"Client #{client_id} says: {data}")
            await manager.send_message(data, client_id)
            # await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        # await manager.broadcast(f"Client #{client_id} left the chat")

if __name__ == "__main__":
    kwargs = {"host": "0.0.0.0", "port": 8000}
    kwargs.update({"debug": True, "reload": True})
    uvicorn.run("websocket_fastapi:app", **kwargs)