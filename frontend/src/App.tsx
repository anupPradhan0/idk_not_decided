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
    <div className="min-h-svh text-white">
      <div className="aiext-grid pointer-events-none fixed inset-0 opacity-[0.14]" />
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
    </div>
  )
}

type TabId = 'overview' | 'extensions' | 'users' | 'settings'

export default function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [submittedRepoUrl, setSubmittedRepoUrl] = useState('')
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      {!submittedRepoUrl ? (
        <HeroInput
          onConnect={(url: string) => {
            setRepoUrl(url)
            setSubmittedRepoUrl(url)
          }}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="grid min-h-[calc(100svh-2.5rem)] grid-cols-1 overflow-hidden rounded-3xl border border-[color:var(--stroke)] bg-[rgba(0,0,0,0.18)] shadow-[0_18px_70px_rgba(0,0,0,0.55)] lg:grid-cols-[280px_1fr]">
            {/* Mobile drawer */}
            <div
              className={[
                'fixed inset-0 z-40 lg:hidden',
                sidebarOpen ? '' : 'pointer-events-none',
              ].join(' ')}
            >
              <div
                className={[
                  'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200',
                  sidebarOpen ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
                onClick={() => setSidebarOpen(false)}
              />
              <div
                className={[
                  'absolute left-0 top-0 h-full w-[86vw] max-w-[320px] transition-transform duration-200',
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                ].join(' ')}
              >
                <Sidebar
                  activeTab={activeTab}
                  setActiveTab={(t) => {
                    setActiveTab(t)
                    setSidebarOpen(false)
                  }}
                />
              </div>
            </div>

            <div className="hidden lg:block">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="flex min-w-0 flex-col">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--stroke)] px-4 py-4 sm:px-5">
                <div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--stroke)] bg-[color:var(--panel)] text-white/80 transition hover:bg-[color:var(--panel2)] lg:hidden"
                      onClick={() => setSidebarOpen(true)}
                      aria-label="Open sidebar"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 6h16M4 12h16M4 18h16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>

                    <div className="font-display text-lg font-semibold text-white">
                    {activeTab === 'overview'
                      ? 'Overview'
                      : activeTab === 'extensions'
                        ? 'File Tree'
                        : activeTab === 'users'
                          ? 'Branches'
                          : 'Settings'}
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/55">
                    <span className="rounded-full border border-[color:var(--stroke)] bg-[color:var(--panel)] px-3 py-1 font-mono text-white/60">
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
                  className="rounded-xl border border-[color:var(--stroke)] bg-[color:var(--panel)] px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-[color:var(--panel2)]"
                >
                  Disconnect
                </button>
              </header>

              <main className="min-w-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                <div className="transition-all duration-250 ease-out">
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
                            className="rounded-xl border border-[color:var(--stroke)] bg-[color:var(--panel)] px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-[color:var(--panel2)]"
                            onClick={() => analysis.refetch()}
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <LoadingPanel label="Connecting & saving…" />
                    )
                  ) : (
                    <>
                      {/* GitHub Error Banner */}
                      {analysis.data?.githubError && (
                        <div className="mb-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-lg">⚠️</span>
                            <div>
                              <div className="text-sm font-semibold text-yellow-200">
                                Could not load GitHub data
                              </div>
                              <div className="mt-1 text-sm text-yellow-200/80">
                                {analysis.data.githubError}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab Content */}
                      {activeTab === 'overview' && analysis.data?.github && (
                        <Overview
                          repo={analysis.data.repo}
                          github={analysis.data.github}
                        />
                      )}

                      {activeTab === 'extensions' && analysis.data?.github && (
                        <Extensions
                          tree={analysis.data.github.tree}
                          truncated={analysis.data.github.truncated}
                        />
                      )}

                      {activeTab === 'users' && analysis.data?.github && (
                        <Users
                          branches={analysis.data.github.branches}
                          defaultBranch={analysis.data.github.stats.defaultBranch}
                        />
                      )}

                      {activeTab === 'settings' && (
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur">
                          <h2 className="font-display text-lg font-semibold text-white mb-2">Settings</h2>
                          <p className="text-white/60">Coming soon...</p>
                        </div>
                      )}
                    </>
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
