const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "")

interface RepoStats {
  stars: number | null
  forks: number | null
  language: string | null
  description: string | null
  visibility: string | null
  defaultBranch: string | null
}

interface TreeNode {
  path: string
  type: "blob" | "tree"
}

interface GithubBranch {
  name: string
}

interface GithubData {
  stats: RepoStats
  tree: TreeNode[]
  branches: GithubBranch[]
  rootFileCount: number
  rootFolderCount: number
  truncated: boolean
}

interface AnalyzeResponse {
  repo: {
    id: string
    repoUrl: string
    connectedAt: string
    repoName: string
    owner: string
    status: string
  }
  github: GithubData | null
  githubError?: string
}

export async function postAnalyzeRepo(repoUrl: string): Promise<AnalyzeResponse> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/api/repos/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    })
  } catch {
    throw new Error(`Cannot reach backend at ${API_BASE_URL}`)
  }

  if (!response.ok) {
    let message = "Failed to analyze repository URL"
    try {
      const payload = (await response.json()) as { detail?: string }
      if (payload?.detail) {
        message = payload.detail
      }
    } catch {
      // Keep default message when backend response is not JSON.
    }
    throw new Error(message)
  }

  return (await response.json()) as AnalyzeResponse
}
