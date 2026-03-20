from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.repository import Repository
from app.services.github_url import ParsedGithubRepo


def create_or_get_repository(db: Session, parsed: ParsedGithubRepo) -> Repository:
    existing = db.execute(
        select(Repository).where(Repository.repo_url == parsed.canonical_url)
    ).scalar_one_or_none()

    if existing:
        return existing

    repo = Repository(
        repo_url=parsed.canonical_url,
        owner=parsed.owner,
        repo_name=parsed.repo_name,
        status="connected",
    )
    db.add(repo)
    db.commit()
    db.refresh(repo)
    return repo
