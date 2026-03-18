import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import HeroInput from './HeroInput'
import Sidebar from './Sidebar'
import Overview from './Overview'
import Extensions from './Extensions'
import Users from './Users'
import { analyzeRepo } from './lib/mockApi'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-[radial-gradient(80%_55%_at_30%_0%,rgba(80,220,255,0.16),transparent_60%),radial-gradient(65%_55%_at_85%_15%,rgba(0,255,166,0.10),transparent_55%),linear-gradient(to_bottom,rgba(7,10,18,1),rgba(5,7,12,1))] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative">{children}</div>
    </div>
  )
}

function LoadingPanel({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-white/10 bg-black/20 p-10 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-[color:var(--accent)]" />
        <div className="text-sm text-white/70">{label}</div>
      </div>
      <div className="mt-3 font-mono text-xs text-white/45">
        mapping code surface area • finding extension points • indexing prompts
      </div>
    </div>
  )
}

function SettingsPlaceholder() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
      <h2 className="font-display text-base font-semibold text-white">Settings</h2>
      <p className="mt-2 text-sm text-white/60">
        Placeholder settings panel (theme, auth, billing, prompt policies).
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/55">Prompt sandbox</div>
          <div className="mt-2 font-mono text-sm text-white/80">enabled</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-white/55">Default model</div>
          <div className="mt-2 font-mono text-sm text-white/80">aiext/gpt-x</div>
        </div>
      </div>
    </div>
  )
}

type TabId = 'overview' | 'extensions' | 'users' | 'settings'

export default function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [submittedRepoUrl, setSubmittedRepoUrl] = useState('')
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const analyzingRepoUrl = useMemo(() => submittedRepoUrl, [submittedRepoUrl])

  const analysis = useQuery({
    queryKey: ['analyze', analyzingRepoUrl],
    queryFn: () => analyzeRepo(analyzingRepoUrl),
    enabled: !!analyzingRepoUrl,
    retry: 0,
  })

  const connected = analysis.isSuccess

  return (
    <Shell>
      <style>{`
        :root { --accent: #50dcff; }
        .font-display { font-family: "Sora", ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      `}</style>

      {!submittedRepoUrl ? (
        <HeroInput
          onConnect={(url: string) => {
            setRepoUrl(url)
            setSubmittedRepoUrl(url)
          }}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid min-h-[calc(100svh-3rem)] grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-black/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] lg:grid-cols-[280px_1fr]">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex min-w-0 flex-col">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <div className="font-display text-lg font-semibold text-white">
                    {activeTab === 'overview'
                      ? 'Overview'
                      : activeTab === 'extensions'
                        ? 'Extensions'
                        : activeTab === 'users'
                          ? 'Users'
                          : 'Settings'}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/55">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono">
                      repo
                    </span>
                    <span className="font-mono text-white/70">{repoUrl}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRepoUrl('')
                    setRepoUrl('')
                    setActiveTab('overview')
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/7"
                >
                  Disconnect
                </button>
              </header>

              <main className="min-w-0 flex-1 px-5 py-5">
                <div className="transition-opacity duration-300">
                  {!connected ? (
                    analysis.isError ? (
                      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
                        <div className="font-display text-base font-semibold text-red-200">
                          Connection failed
                        </div>
                        <div className="mt-2 text-sm text-red-200/80">
                          {analysis.error instanceof Error
                            ? analysis.error.message
                            : 'Invalid repo URL.'}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="rounded-xl bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-black transition hover:brightness-110"
                            onClick={() => {
                              setSubmittedRepoUrl('')
                              setRepoUrl('')
                            }}
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/7"
                            onClick={() => analysis.refetch()}
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <LoadingPanel label="Connecting & analyzing…" />
                    )
                  ) : activeTab === 'overview' ? (
                    <Overview repoUrl={repoUrl} />
                  ) : activeTab === 'extensions' ? (
                    <Extensions />
                  ) : activeTab === 'users' ? (
                    <Users />
                  ) : (
                    <SettingsPlaceholder />
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </Shell>
  )
}

