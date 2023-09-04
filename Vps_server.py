import uvicorn
from pydantic import BaseModel
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, Form, requests, UploadFile
from fastapi.templating import Jinja2Templates
# from starlette.testclient import TestClient
from sse_starlette.sse import EventSourceResponse
from fastapi.middleware.gzip import GZipMiddleware

app_api = FastAPI()
@app_api.get("/")
async def get_dataframe(request: Request):
    return 'test'
if __name__ == '__main__':
    uvicorn.run("Vps_server:app_api", host=f"0.0.0.0", port=60100, reload=True, debug= True, log_level="debug")