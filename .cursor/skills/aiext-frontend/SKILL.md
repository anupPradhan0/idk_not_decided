---
name: aiext-frontend
description: Implement and refine the aiext open-source dashboard frontend (Vite + React + TypeScript + TanStack Query + Tailwind). Use when editing UI/UX, responsive layout, Tailwind styling, mock API data flows, or when changing files under frontend/src/*.
---

# aiext frontend

This project is an **open-source hobby UI sandbox** (not a polished product). Keep changes simple, readable, and easy to contribute to.

## Quick rules (defaults)

- **Stack**: Vite + React + TypeScript + Tailwind CSS + TanStack Query.
- **Tone**: open-source / experimental / built-in-public. Avoid “enterprise product” marketing copy.
- **Data**: use TanStack Query for any “fetching”; mock via `setTimeout` in `frontend/src/lib/mockApi.ts`.
- **Styling**: Tailwind classes first. Prefer consistent tokens defined in `frontend/src/index.css` (e.g. `--stroke`, `--panel`, `--accent`).
- **Responsiveness**:
  - Mobile-first (`sm`, `md`, `lg`, `xl`) and test small widths.
  - Tables must be scrollable (`overflow-x-auto`) and never force horizontal page scroll.
  - Sidebar should be a drawer on mobile and fixed on desktop.

## File map (frontend)

- **Entry**: `frontend/src/main.tsx`
- **App shell / routing state**: `frontend/src/App.tsx`
  - Uses `useState` for active tab and “connected repo” state.
  - Shows a brief loading state during “Connect & Analyze”.
- **Landing**: `frontend/src/HeroInput.tsx`
  - Validate GitHub URLs start with `https://github.com/`
- **Dashboard**:
  - `frontend/src/Sidebar.tsx`
  - `frontend/src/Overview.tsx`
  - `frontend/src/Extensions.tsx`
  - `frontend/src/Users.tsx`
- **Mock data**: `frontend/src/lib/mockApi.ts`
- **Global design utilities**: `frontend/src/index.css`

## Patterns to follow

### 1) TanStack Query usage

- Use stable keys:
  - `['analyze', repoUrl]`
  - `['overview', repoUrl]`
  - `['extensions']`
  - `['users']`
- Prefer `enabled` instead of manual guards when a query depends on input state.
- Keep mock API functions typed and deterministic (no random values unless explicitly requested).

### 2) UI authenticity (avoid “AI template” look)

- Prefer **purposeful** spacing and hierarchy over decorative gradients.
- Avoid overusing “glassmorphism everywhere”; use it selectively.
- Use small, grounded details (badges, subtle dividers, real-ish copy).
- Keep animations subtle: short `transition-*`, no long/floaty animations.

### 3) Contribution-friendly changes

- Keep components small and single-purpose.
- Avoid clever abstractions; prefer local helpers within a file.
- If adding a new UI pattern, use it in at least 2 places or keep it local.

## Checklist for UI changes

- [ ] Mobile layout works (320px wide)
- [ ] Keyboard focus states are visible on interactive elements
- [ ] GitHub URL validation still works
- [ ] `npm run build` passes

