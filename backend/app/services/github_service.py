import httpx
import os

async def fetch_repo_data(owner: str, repo: str) -> dict:
    base = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {"Accept": "application/vnd.github+json"}
    
    # Add GitHub token if available (for higher rate limits)
    github_token = os.getenv("GITHUB_TOKEN")
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    async with httpx.AsyncClient() as client:
        repo_res = await client.get(base, headers=headers)
        tree_res = await client.get(f"{base}/git/trees/HEAD?recursive=1", headers=headers)
        branches_res = await client.get(f"{base}/branches", headers=headers)

    if repo_res.status_code == 404:
        raise ValueError("Repository not found or is private")
    if repo_res.status_code == 403:
        raise ValueError("GitHub API rate limit exceeded")
    
    if tree_res.status_code != 200:
        raise ValueError(f"GitHub API error: {tree_res.status_code}")
    
    if branches_res.status_code != 200:
        raise ValueError(f"GitHub API error: {branches_res.status_code}")

    repo_data = repo_res.json()
    tree_data = tree_res.json()
    branches_data = branches_res.json()

    # Ensure tree_data has the expected structure
    if not isinstance(tree_data, dict) or "tree" not in tree_data:
        raise ValueError("Invalid tree data from GitHub API")

    all_items = tree_data.get("tree", [])
    
    # Root items only (0 levels deep)
    root_items = [
        item for item in all_items
        if isinstance(item, dict) and "/" not in item.get("path", "") and not item.get("path", "").startswith(".")
    ]
    
    total_file_count = len([item for item in all_items if isinstance(item, dict) and item.get("type") == "blob" and not item.get("path", "").startswith(".")])

    return {
        "stats": {
            "stars": repo_data.get("stargazers_count"),
            "forks": repo_data.get("forks_count"),
            "language": repo_data.get("language"),
            "description": repo_data.get("description"),
            "visibility": repo_data.get("visibility"),
            "default_branch": repo_data.get("default_branch"),
        },
        "tree": root_items,
        "branches": [
            {"name": branch["name"]}
            for branch in branches_data
            if isinstance(branch, dict) and "name" in branch
        ],
        "total_file_count": total_file_count,
        "root_file_count": len([item for item in root_items if item.get("type") == "blob"]),
        "root_folder_count": len([item for item in root_items if item.get("type") == "tree"]),
        "truncated": tree_data.get("truncated", False)
    }
