import { useMemo, useState } from 'react'

function normalizeGithubUrl(raw: string) {
  const v = raw.trim()
  if (!v) return ''
  return v
}

export default function HeroInput({ onConnect }: { onConnect: (url: string) => void }) {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  const normalized = useMemo(() => normalizeGithubUrl(value), [value])
  const isValid = normalized.startsWith('https://github.com/')
  const showError = touched && !!normalized && !isValid

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 [background-image:radial-gradient(circle_at_1px_1px,rgba(80,220,255,0.12)_1px,transparent_0)] [background-size:18px_18px]" />

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-16 sm:pt-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
          <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_18px_rgba(80,220,255,0.65)]" />
          Open-source playground for AI extensibility
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              aiext
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              aiext is an open-source hobby project exploring “AI extensibility” — the idea that
              users can build features with prompts on top of your codebase. It’s a sandbox right
              now, not a polished product.
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <label className="block text-xs font-medium text-white/70">GitHub repo URL</label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="https://github.com/owner/repo"
                  className={[
                    'h-12 w-full rounded-xl border bg-black/30 px-4 font-mono text-sm text-white outline-none transition',
                    'placeholder:text-white/35',
                    showError
                      ? 'border-red-500/60 focus:ring-2 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-white/25 focus:ring-2 focus:ring-[color:var(--accent)]/25',
                  ].join(' ')}
                />
                <button
                  type="button"
                  onClick={() => {
                    setTouched(true)
                    if (!isValid) return
                    onConnect(normalized)
                  }}
                  className={[
                    'h-12 shrink-0 rounded-xl px-5 text-sm font-semibold text-black transition',
                    'bg-[color:var(--accent)] hover:brightness-110 active:brightness-95',
                    !isValid ? 'cursor-not-allowed opacity-60' : '',
                  ].join(' ')}
                  disabled={!isValid}
                >
                  Connect &amp; Save
                </button>
              </div>

              {showError ? (
                <p className="mt-2 text-xs text-red-300">
                  URL must start with <span className="font-mono">https://github.com/</span>
                </p>
              ) : (
                <p className="mt-2 text-xs text-white/45">This saves the repo URL to backend + DB.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 backdrop-blur">
            <h2 className="font-display text-lg font-semibold text-white">How it works</h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  step: '01',
                  title: 'Paste your GitHub repo',
                  body: 'Connect the codebase you want to make extensible.',
                },
                {
                  step: '02',
                  title: 'AI analyzes your codebase',
                  body: 'We simulate analysis and show what the dashboard could look like.',
                },
                {
                  step: '03',
                  title: 'Users build features with prompts',
                  body: 'The long-term idea: prompt-built extensions (still experimental).',
                },
              ].map((c) => (
                <div
                  key={c.step}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/50">{c.step}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20 transition group-hover:bg-[color:var(--accent)]" />
                  </div>
                  <div className="mt-2 font-medium text-white">{c.title}</div>
                  <div className="mt-1 text-sm text-white/60">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

