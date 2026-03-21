from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class AnalyzeRepoRequest(BaseModel):
    repo_url: str = Field(alias="repoUrl")

    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class RepoBase(BaseModel):
    id: str
    repo_url: str = Field(alias="repoUrl")
    connected_at: datetime = Field(alias="connectedAt")
    repo_name: str = Field(alias="repoName")
    owner: str
    status: str

    model_config = ConfigDict(populate_by_name=True)


class GitHubStats(BaseModel):
    stars: Optional[int] = None
    forks: Optional[int] = None
    language: Optional[str] = None
    description: Optional[str] = None
    visibility: Optional[str] = None


class GitHubTreeItem(BaseModel):
    path: str
    type: str


class GitHubData(BaseModel):
    stats: GitHubStats
    tree: list[GitHubTreeItem]
    truncated: bool


class RepoAnalysisResponse(BaseModel):
    repo: RepoBase
    github: Optional[GitHubData] = None
    github_error: Optional[str] = Field(None, alias="githubError")

    model_config = ConfigDict(populate_by_name=True)
