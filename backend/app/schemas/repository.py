from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AnalyzeRepoRequest(BaseModel):
    repo_url: str = Field(alias="repoUrl")

    model_config = ConfigDict(populate_by_name=True, extra="forbid")


class RepoAnalysisResponse(BaseModel):
    id: str
    repo_url: str = Field(alias="repoUrl")
    connected_at: datetime = Field(alias="connectedAt")
    repo_name: str = Field(alias="repoName")
    owner: str
    status: str

    model_config = ConfigDict(populate_by_name=True)
