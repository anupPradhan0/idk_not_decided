const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8000").replace(/\/$/, "")

type AnalyzeRepoApiResponse = {
  id: string
  repoUrl: string
  connectedAt: string
  repoName: string
  owner: string
  status: string
}

export async function postAnalyzeRepo(repoUrl: string): Promise<AnalyzeRepoApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/repos/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repoUrl }),
  })

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

  return (await response.json()) as AnalyzeRepoApiResponse
}
