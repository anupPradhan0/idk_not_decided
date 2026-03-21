import { postAnalyzeRepo } from './api'

export async function analyzeRepo(repoUrl: string) {
  return await postAnalyzeRepo(repoUrl)
}
