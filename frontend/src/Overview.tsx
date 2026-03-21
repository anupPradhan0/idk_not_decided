interface RepoInfo {
  repoName: string
  owner: string
  repoUrl: string
}

interface RepoStats {
  stars: number | null
  forks: number | null
  language: string | null
  description: string | null
  visibility: string | null
  defaultBranch: string | null
}

interface GithubData {
  stats: RepoStats
  rootFileCount: number
  rootFolderCount: number
  branches: Array<{ name: string }>
}

interface OverviewProps {
  repo: RepoInfo
  github: GithubData
}

export default function Overview({ repo, github }: OverviewProps) {
  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">
              {repo.repoName}
            </h1>
            <p className="mt-2 text-sm text-white/70">{github.stats.description || "No description"}</p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  github.stats.visibility === "public"
                    ? "bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-400/20"
                    : "bg-white/10 text-white/70 ring-1 ring-white/10"
                }`}
              >
                {github.stats.visibility?.charAt(0).toUpperCase() + (github.stats.visibility?.slice(1) || "")}
              </span>
              <span className="text-xs text-white/45">•</span>
              <span className="text-sm text-white/60">{github.stats.defaultBranch}</span>
            </div>
          </div>
          <a
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stars */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <div className="text-2xl font-semibold text-white">
                {github.stats.stars?.toLocaleString() || "—"}
              </div>
              <div className="text-xs text-white/55">Stars</div>
            </div>
          </div>
        </div>

        {/* Forks */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍴</span>
            <div>
              <div className="text-2xl font-semibold text-white">
                {github.stats.forks?.toLocaleString() || "—"}
              </div>
              <div className="text-xs text-white/55">Forks</div>
            </div>
          </div>
        </div>

        {/* Files */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <div className="text-2xl font-semibold text-white">
                {github.rootFileCount}
              </div>
              <div className="text-xs text-white/55">Files</div>
            </div>
          </div>
        </div>

        {/* Folders */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <div>
              <div className="text-2xl font-semibold text-white">
                {github.rootFolderCount}
              </div>
              <div className="text-xs text-white/55">Folders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Language */}
      {github.stats.language && (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
            <div>
              <div className="text-sm font-medium text-white">{github.stats.language}</div>
              <div className="text-xs text-white/55">Primary Language</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
