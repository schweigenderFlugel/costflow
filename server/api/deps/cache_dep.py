from fastapi import Depends
from redis import Redis

from config.envs import REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD

def get_cache():
    return Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        username=REDIS_USERNAME,
        password=REDIS_PASSWORD
    )

CacheDep = Depends[Redis, Depends(get_cache)]