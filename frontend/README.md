# aiext (frontend)

Open-source hobby dashboard UI for **aiext** (universal AI extension platform concept).

This repo is currently a **UI-first sandbox**:
- Repo URL submission (`Connect & Analyze`) now calls a backend API
- Overview, Extensions, and Users still use placeholder data via TanStack Query
- Styling is Tailwind CSS (dark, dev-focused)

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Set the backend URL in local env if needed:

```bash
cp .env.example .env.local
```

## What’s inside

- Vite + React + TypeScript
- Tailwind CSS (v4)
- TanStack Query

## Notes

This is intentionally small and hackable. PRs welcome.
