import { useQuery } from '@tanstack/react-query'
import { fetchOverview } from './lib/mockApi'

type Stat = { label: string; value: string | number }
type Activity = { id: string; user: string; prompt: string; when: string }
type Repo = { id: string; name: string; url: string; status: string }

type OverviewData = {
  stats: Stat[]
  activity: Activity[]
  connectedRepos: Repo[]
}

function StatCard({ label, value }: Stat) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-xs text-white/55">{label}</div>
      <div className="mt-2 font-mono text-2xl font-semibold text-white">{value}</div>
    </div>
  )
}

function Section({
  title,
  children,
  right,
}: {
  title: string
  children: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-base font-semibold text-white">{title}</h2>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function Overview({ repoUrl }: { repoUrl: string }) {
  const q = useQuery<OverviewData>({
    queryKey: ['overview', repoUrl],
    queryFn: () => fetchOverview(repoUrl),
  })

  if (q.isLoading) {
    return (
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[92px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
      </div>
    )
  }

  if (q.isError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        {q.error instanceof Error ? q.error.message : 'Failed to load overview.'}
      </div>
    )
  }

  if (!q.data) return null
  const data = q.data

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Section
          title="Recent activity"
          right={
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              Live prompts
            </span>
          }
        >
          <ul className="divide-y divide-white/10">
            {data.activity.map((a) => (
              <li key={a.id} className="py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-white">
                      <span className="font-medium">{a.user}</span>{' '}
                      <span className="text-white/60">submitted:</span>
                    </div>
                    <div className="mt-1 font-mono text-xs leading-relaxed text-white/70">
                      “{a.prompt}”
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-white/45">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Connected repos">
          <div className="grid gap-3">
            {data.connectedRepos.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-white/55">GitHub</div>
                    <div className="mt-1 font-medium text-white">{r.name}</div>
                    <div className="mt-1 text-xs text-white/50">Click to open repo</div>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">
                    {r.status}
                  </span>
                </div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

