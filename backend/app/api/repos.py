from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.repository import (
    AnalyzeRepoRequest,
    RepoAnalysisResponse,
    RepoBase,
    GitHubData,
    GitHubStats,
    GitHubTreeItem,
    GitHubBranch,
)
from app.services.github_url import parse_github_repo_url
from app.services.repositories import create_or_get_repository
from app.services.github_service import fetch_repo_data

router = APIRouter(prefix="/repos", tags=["repos"])


@router.post("/analyze", response_model=RepoAnalysisResponse)
async def analyze_repo(payload: AnalyzeRepoRequest, db: Session = Depends(get_db)) -> RepoAnalysisResponse:
    parsed = parse_github_repo_url(payload.repo_url)
    record = create_or_get_repository(db, parsed)

    # Create the repo base object
    repo_base = RepoBase(
        id=str(record.id),
        repo_url=record.repo_url,
        connected_at=record.created_at,
        repo_name=record.repo_name,
        owner=record.owner,
        status=record.status,
    )

    # Try to fetch GitHub data
    github_data = None
    github_error = None

    try:
        github_response = await fetch_repo_data(record.owner, record.repo_name)
        github_data = GitHubData(
            stats=GitHubStats(**github_response["stats"]),
            tree=[GitHubTreeItem(**item) for item in github_response["tree"]],
            branches=[GitHubBranch(**item) for item in github_response["branches"]],
            root_file_count=github_response["root_file_count"],
            root_folder_count=github_response["root_folder_count"],
            truncated=github_response["truncated"],
        )
    except Exception as e:
        github_error = str(e)

    return RepoAnalysisResponse(
        repo=repo_base,
        github=github_data,
        github_error=github_error,
    )
