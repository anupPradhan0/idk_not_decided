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

export default LoadingPanel
