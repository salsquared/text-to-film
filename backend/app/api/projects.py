from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services import ProjectService
from app.models.database import CacheService
from app.core.deps import get_db, get_cache

router = APIRouter()

@router.get("/projects/{project_id}")
async def get_project(
    project_id: str,
    db: Session = Depends(get_db),
    cache: CacheService = Depends(get_cache)
):
    # Check cache first
    cached_project = await cache.get_project(project_id)
    if cached_project:
        return cached_project
        
    # Get from database
    project = await ProjectService.get_project(db, project_id)
    # Cache for future requests
    await cache.set_project(project_id, project)
    return project 