from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.repository import AnalyzeRepoRequest, RepoAnalysisResponse
from app.services.github_url import parse_github_repo_url
from app.services.repositories import create_or_get_repository

router = APIRouter(prefix="/repos", tags=["repos"])


@router.post("/analyze", response_model=RepoAnalysisResponse)
def analyze_repo(payload: AnalyzeRepoRequest, db: Session = Depends(get_db)) -> RepoAnalysisResponse:
    parsed = parse_github_repo_url(payload.repo_url)
    record = create_or_get_repository(db, parsed)

    return RepoAnalysisResponse(
        id=str(record.id),
        repo_url=record.repo_url,
        connected_at=record.created_at,
        repo_name=record.repo_name,
        owner=record.owner,
        status=record.status,
    )
