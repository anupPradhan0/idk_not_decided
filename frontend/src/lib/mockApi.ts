const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export type RepoAnalysis = {
  repoUrl: string
  connectedAt: string
  repoName: string
}

export type OverviewStat = { label: string; value: string | number }
export type ActivityItem = { id: string; user: string; prompt: string; when: string }
export type ConnectedRepo = { id: string; name: string; url: string; status: string }

export type OverviewResponse = {
  stats: OverviewStat[]
  activity: ActivityItem[]
  connectedRepos: ConnectedRepo[]
}

export type ExtensionItem = {
  id: string
  name: string
  builtBy: string
  status: 'Active' | 'Draft'
  createdAt: string
}

export type UserItem = {
  id: string
  name: string
  extensionsBuilt: number
  lastActive: string
  status: 'Active' | 'Invited' | 'Suspended'
}

export async function analyzeRepo(repoUrl: string): Promise<RepoAnalysis> {
  await sleep(900)

  if (!repoUrl.startsWith('https://github.com/')) {
    throw new Error('Invalid GitHub URL')
  }

  return {
    repoUrl,
    connectedAt: new Date().toISOString(),
    repoName: repoUrl.replace('https://github.com/', ''),
  }
}

export async function fetchOverview(repoUrl: string): Promise<OverviewResponse> {
  await sleep(500)
  return {
    stats: [
      { label: 'Total Extensions Built', value: 128 },
      { label: 'Active Users', value: 42 },
      { label: 'Repos Connected', value: 7 },
      { label: 'AI Calls Made', value: '18.4k' },
    ],
    activity: [
      {
        id: 'a1',
        user: 'Mina',
        prompt: 'Generate a billing reconciliation report extension.',
        when: '2m ago',
      },
      {
        id: 'a2',
        user: 'Rafi',
        prompt: 'Add an AI “support triage” workflow for Zendesk tickets.',
        when: '18m ago',
      },
      {
        id: 'a3',
        user: 'Jules',
        prompt: 'Create a “CSV → insights” extension for uploaded exports.',
        when: '1h ago',
      },
      {
        id: 'a4',
        user: 'Kai',
        prompt: 'Draft a new onboarding checklist extension with prompts.',
        when: '4h ago',
      },
    ],
    connectedRepos: [
      {
        id: 'r1',
        name: repoUrl.replace('https://github.com/', ''),
        url: repoUrl,
        status: 'Connected',
      },
    ],
  }
}

export async function fetchExtensions(): Promise<ExtensionItem[]> {
  await sleep(650)
  return [
    {
      id: 'e1',
      name: 'Smart Release Notes',
      builtBy: 'Mina',
      status: 'Active',
      createdAt: '2026-03-03',
    },
    {
      id: 'e2',
      name: 'Customer Health Radar',
      builtBy: 'Jules',
      status: 'Draft',
      createdAt: '2026-03-10',
    },
    {
      id: 'e3',
      name: 'Changelog Translator',
      builtBy: 'Rafi',
      status: 'Active',
      createdAt: '2026-03-12',
    },
    {
      id: 'e4',
      name: 'Ops Incident Summarizer',
      builtBy: 'Kai',
      status: 'Draft',
      createdAt: '2026-03-16',
    },
    {
      id: 'e5',
      name: 'AI Pull Request Coach',
      builtBy: 'Mina',
      status: 'Active',
      createdAt: '2026-03-18',
    },
    {
      id: 'e6',
      name: 'Revenue Anomaly Detector',
      builtBy: 'Jules',
      status: 'Active',
      createdAt: '2026-03-18',
    },
  ]
}

export async function fetchUsers(): Promise<UserItem[]> {
  await sleep(700)
  return [
    { id: 'u1', name: 'Mina', extensionsBuilt: 14, lastActive: '2m ago', status: 'Active' },
    { id: 'u2', name: 'Rafi', extensionsBuilt: 6, lastActive: '18m ago', status: 'Active' },
    { id: 'u3', name: 'Jules', extensionsBuilt: 9, lastActive: '1h ago', status: 'Active' },
    { id: 'u4', name: 'Kai', extensionsBuilt: 3, lastActive: '2d ago', status: 'Invited' },
    { id: 'u5', name: 'Noor', extensionsBuilt: 1, lastActive: '6d ago', status: 'Suspended' },
  ]
}

