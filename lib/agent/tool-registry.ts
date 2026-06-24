import type { KulfonToolManifest, KulfonToolName } from './tool-types';

export const toolRegistry = {
  getRepoInfo: {
    name: 'getRepoInfo',
    description: 'Pobierz podstawowe informacje o skonfigurowanym repozytorium GitHub.',
    domain: 'github',
    risk: 'read',
    requiresApproval: false,
  },
  listOpenIssues: {
    name: 'listOpenIssues',
    description: 'Pobierz otwarte issue z repozytorium GitHub.',
    domain: 'github',
    risk: 'read',
    requiresApproval: false,
  },
  createGithubIssue: {
    name: 'createGithubIssue',
    description: 'Utwórz issue w GitHubie. Używaj dla bugów, feature requestów i zadań technicznych.',
    domain: 'github',
    risk: 'external_action',
    requiresApproval: true,
  },
  createJulesTaskIssue: {
    name: 'createJulesTaskIssue',
    description: 'Utwórz dobrze opisane issue oznaczone labelem jules, aby Jules mógł przejąć zadanie.',
    domain: 'jules',
    risk: 'external_action',
    requiresApproval: true,
  },
  listVercelDeployments: {
    name: 'listVercelDeployments',
    description: 'Pobierz ostatnie deploymenty z Vercel. Wymaga VERCEL_TOKEN i opcjonalnie VERCEL_PROJECT_ID.',
    domain: 'vercel',
    risk: 'read',
    requiresApproval: false,
  },
} satisfies Record<KulfonToolName, KulfonToolManifest>;

export function getToolManifest(toolName: string): KulfonToolManifest | undefined {
  return toolRegistry[toolName as KulfonToolName];
}

export function toolRequiresApproval(toolName: string): boolean {
  return getToolManifest(toolName)?.requiresApproval ?? true;
}

export const TOOLS_REQUIRING_APPROVAL = Object.values(toolRegistry)
  .filter((tool) => tool.requiresApproval)
  .map((tool) => tool.name);
