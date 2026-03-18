type TabId = 'overview' | 'extensions' | 'users' | 'settings'

const nav: Array<{ id: TabId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'extensions', label: 'Extensions' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' },
]

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}) {
  return (
    <aside className="flex h-full flex-col border-r border-white/10 bg-black/20 px-4 py-5 backdrop-blur">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <div className="h-5 w-5 rounded-md bg-[color:var(--accent)] shadow-[0_0_20px_rgba(80,220,255,0.55)]" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold text-white">aiext</div>
          <div className="text-xs text-white/45">Developer dashboard</div>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {nav.map((item) => {
          const active = item.id === activeTab
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={[
                'flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition',
                active
                  ? 'bg-white/8 text-white ring-1 ring-white/10'
                  : 'text-white/60 hover:bg-white/5 hover:text-white',
              ].join(' ')}
            >
              <span>{item.label}</span>
              {active ? (
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              ) : null}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
        <div className="font-mono">aiext://platform</div>
        <div className="mt-1">Secure prompt-based extensibility.</div>
      </div>
    </aside>
  )
}

