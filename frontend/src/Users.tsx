import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from './lib/mockApi'

type UserStatus = 'Active' | 'Invited' | 'Suspended'
type UserRow = {
  id: string
  name: string
  extensionsBuilt: number
  lastActive: string
  status: UserStatus
}

function StatusPill({ status }: { status: UserStatus }) {
  const map: Record<UserStatus, string> = {
    Active: 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/20',
    Invited: 'bg-sky-400/10 text-sky-200 ring-sky-400/20',
    Suspended: 'bg-rose-400/10 text-rose-200 ring-rose-400/20',
  }
  return (
    <span className={['rounded-full px-3 py-1 text-xs font-semibold ring-1', map[status]].join(' ')}>
      {status}
    </span>
  )
}

export default function Users() {
  const q = useQuery<UserRow[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (q.isLoading) {
    return (
      <div className="h-[360px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
    )
  }

  if (q.isError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        {q.error instanceof Error ? q.error.message : 'Failed to load users.'}
      </div>
    )
  }

  if (!q.data) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs text-white/55">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Extensions Built</th>
              <th className="px-5 py-3 font-medium">Last Active</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {q.data.map((u) => (
              <tr key={u.id} className="transition hover:bg-white/5">
                <td className="px-5 py-4 font-medium text-white">{u.name}</td>
                <td className="px-5 py-4 font-mono text-white/70">{u.extensionsBuilt}</td>
                <td className="px-5 py-4 font-mono text-white/70">{u.lastActive}</td>
                <td className="px-5 py-4">
                  <StatusPill status={u.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

