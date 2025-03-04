from uuid import UUID
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# PostgreSQL for persistent data
class Project(Base):
    __tablename__ = "projects"
    id = Column(UUID, primary_key=True)
    title = Column(String)
    user_id = Column(UUID, ForeignKey("users.id"))
    scenes = relationship("Scene", back_populates="project")
    # ...

class Scene(Base):
    __tablename__ = "scenes"
    id = Column(UUID, primary_key=True)
    name = Column(String)
    content = Column(String)
    project_id = Column(UUID, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="scenes")

# Redis for caching and real-time features
class CacheService:
    def __init__(self, redis_client):
        self.redis = redis_client
    
    async def cache_generation_progress(self, project_id: str, progress: float):
        await self.redis.hset(f"project:{project_id}:progress", mapping={
            "status": "generating",
            "progress": progress
        })

    async def get_project(self, project_id: str):
        return await self.redis.get(f"project:{project_id}")

    async def set_project(self, project_id: str, project_data: dict):
        await self.redis.set(f"project:{project_id}", project_data) 