import { postAnalyzeRepo } from './api'

export async function analyzeRepo(repoUrl: string) {
  const response = await postAnalyzeRepo(repoUrl)
  
  // Transform snake_case to camelCase for frontend
  if (response.github) {
    response.github = {
      ...response.github,
      totalFileCount: (response.github as any).total_file_count,
      rootFileCount: (response.github as any).root_file_count,
      rootFolderCount: (response.github as any).root_folder_count,
      stats: {
        ...response.github.stats,
        defaultBranch: (response.github.stats as any).default_branch
      }
    }
  }
  
  return response
}
