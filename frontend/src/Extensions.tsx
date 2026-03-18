import { useQuery } from '@tanstack/react-query'
import { fetchExtensions } from './lib/mockApi'

type Extension = {
  id: string
  name: string
  builtBy: string
  status: 'Active' | 'Draft'
  createdAt: string
}

function StatusBadge({ status }: { status: Extension['status'] }) {
  const active = status === 'Active'
  return (
    <span
      className={[
        'rounded-full px-3 py-1 text-xs font-semibold ring-1',
        active
          ? 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/20'
          : 'bg-amber-400/10 text-amber-200 ring-amber-400/20',
      ].join(' ')}
    >
      {status}
    </span>
  )
}

export default function Extensions() {
  const q = useQuery<Extension[]>({
    queryKey: ['extensions'],
    queryFn: fetchExtensions,
  })

  if (q.isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[138px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    )
  }

  if (q.isError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        {q.error instanceof Error ? q.error.message : 'Failed to load extensions.'}
      </div>
    )
  }

  if (!q.data) return null

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {q.data.map((e) => (
        <div
          key={e.id}
          className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur transition hover:bg-white/5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-display text-base font-semibold text-white">{e.name}</div>
              <div className="mt-1 text-xs text-white/55">
                Built by <span className="font-medium text-white/70">{e.builtBy}</span>
              </div>
            </div>
            <StatusBadge status={e.status} />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="font-mono text-xs text-white/45">Created</div>
            <div className="font-mono text-xs text-white/70">{e.createdAt}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

