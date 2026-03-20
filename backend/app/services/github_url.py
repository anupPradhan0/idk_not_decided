from dataclasses import dataclass
from urllib.parse import unquote, urlparse

from fastapi import HTTPException


@dataclass(frozen=True)
class ParsedGithubRepo:
    canonical_url: str
    owner: str
    repo_name: str


def parse_github_repo_url(raw_url: str) -> ParsedGithubRepo:
    value = raw_url.strip()
    if not value:
        raise HTTPException(status_code=422, detail="repoUrl is required")

    parsed = urlparse(value)
    host = parsed.netloc.lower()
    if host not in {"github.com", "www.github.com"}:
        raise HTTPException(status_code=422, detail="URL must be from github.com")

    if parsed.scheme != "https":
        raise HTTPException(status_code=422, detail="URL must use https")

    parts = [unquote(part) for part in parsed.path.strip("/").split("/") if part]
    if len(parts) < 2:
        raise HTTPException(status_code=422, detail="URL must include owner and repo")

    owner = parts[0]
    repo_name = parts[1]
    if repo_name.endswith(".git"):
        repo_name = repo_name[:-4]

    if not owner or not repo_name:
        raise HTTPException(status_code=422, detail="Invalid GitHub repository URL")

    canonical_url = f"https://github.com/{owner}/{repo_name}"
    return ParsedGithubRepo(canonical_url=canonical_url, owner=owner, repo_name=repo_name)
