interface RepoStats {
  stars: number | null
  forks: number | null
  language: string | null
  description: string | null
  visibility: string | null
}

interface RepoStatsProps {
  stats: RepoStats
}

export default function RepoStats({ stats }: RepoStatsProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
      {/* Description */}
      <p className="text-white/70 mb-4">
        {stats.description || "No description"}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Stars */}
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <span className="text-white/70">
            {stats.stars !== null ? stats.stars.toLocaleString() : "—"}
          </span>
        </div>

        {/* Forks */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🍴</span>
          <span className="text-white/70">
            {stats.forks !== null ? stats.forks.toLocaleString() : "—"}
          </span>
        </div>

        {/* Language */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-white/70">
            {stats.language || "Unknown"}
          </span>
        </div>

        {/* Visibility */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              stats.visibility === "public"
                ? "bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-400/20"
                : stats.visibility === "private"
                ? "bg-white/10 text-white/70 ring-1 ring-white/10"
                : "bg-white/5 text-white/50 ring-1 ring-white/5"
            }`}
          >
            {stats.visibility
              ? stats.visibility.charAt(0).toUpperCase() + stats.visibility.slice(1)
              : "Unknown"}
          </span>
        </div>
      </div>
    </div>
  )
}
