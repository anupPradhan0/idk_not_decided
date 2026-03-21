import httpx

async def fetch_repo_data(owner: str, repo: str) -> dict:
    base = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {"Accept": "application/vnd.github+json"}

    async with httpx.AsyncClient() as client:
        repo_res = await client.get(base, headers=headers)
        tree_res = await client.get(f"{base}/git/trees/HEAD?recursive=1", headers=headers)

    repo_data = repo_res.json()
    tree_data = tree_res.json()

    if repo_res.status_code == 404:
        raise ValueError("Repository not found or is private")
    if repo_res.status_code == 403:
        raise ValueError("GitHub API rate limit exceeded")

    return {
        "stats": {
            "stars": repo_data.get("stargazers_count"),
            "forks": repo_data.get("forks_count"),
            "language": repo_data.get("language"),
            "description": repo_data.get("description"),
            "visibility": repo_data.get("visibility"),
        },
        "tree": [
            {"path": item["path"], "type": item["type"]}
            for item in tree_data.get("tree", [])
            if not item["path"].startswith(".") 
        ],
        "truncated": tree_data.get("truncated", False)
    }
