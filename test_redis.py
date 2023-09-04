from typing import Optional

from aioredis import Redis, create_redis_pool


# Create a RedisCache instance
class RedisCache:

    def __init__(self):
        self.redis_cache: Optional[Redis] = None

    async def init_cache(self):
        self.redis_cache = await create_redis_pool("redis://localhost:6379/0?encoding=utf-8")  # Connecting to database

    async def keys(self, pattern):
        return await self.redis_cache.keys(pattern)

    async def set(self, key, value):
        return await self.redis_cache.set(key, value)

    async def get(self, key):
        return await self.redis_cache.get(key)

    async def close(self):
        self.redis_cache.close()
        await self.redis_cache.wait_closed()


redis_cache = RedisCache()

from fastapi import FastAPI, applications
from uvicorn import run
from fastapi import FastAPI, Request, Response
# from connection import redis_cache



app = FastAPI(title="FastAPI with Redis")


async def get_all():
    return await redis_cache.keys('*')


@app.on_event('startup')
async def starup_event():
    await redis_cache.init_cache()


@app.on_event('shutdown')
async def shutdown_event():
    redis_cache.close()
    await redis_cache.wait_closed()

#root
@app.get("/")
def read_root():
    return {"Redis": "FastAPI"}

#root > Get all keys from the redis DB
@app.get('/RedisKeys')
async def redis_keys():
    return await get_all()

if __name__ == '__main__':
    run("main:app", port=3000, reload=True)