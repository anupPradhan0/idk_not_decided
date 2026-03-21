interface Branch {
  name: string
}

interface UsersProps {
  branches: Branch[]
  defaultBranch?: string | null
}

export default function Users({ branches, defaultBranch }: UsersProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-white">Branches</h2>
          <span className="text-sm text-white/55">{branches.length} total</span>
        </div>

        <div className="space-y-2">
          {branches.map((branch, index) => {
            const isDefault = branch.name === defaultBranch
            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌿</span>
                  <span className="font-mono text-sm text-white/80">{branch.name}</span>
                </div>
                {isDefault && (
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">
                    Default
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
