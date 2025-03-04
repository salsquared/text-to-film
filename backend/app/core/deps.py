from typing import Generator
from sqlalchemy.orm import Session
from redis import Redis
from app.models.database import CacheService
from app.core.config import settings

def get_db() -> Generator[Session, None, None]:
    from app.db.session import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_cache() -> CacheService:
    redis_client = Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        decode_responses=True
    )
    return CacheService(redis_client) 