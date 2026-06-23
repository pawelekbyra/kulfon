type GithubRequestInit = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export function getGithubRepoConfig() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!owner || !repo) {
    throw new Error('Brakuje GITHUB_OWNER lub GITHUB_REPO w zmiennych środowiskowych.');
  }

  return { owner, repo, fullName: `${owner}/${repo}` };
}

export async function githubRequest<T>(path: string, init: GithubRequestInit = {}) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('Brakuje GITHUB_TOKEN w zmiennych środowiskowych.');
  }

  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers ?? {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status}: ${JSON.stringify(data)}`);
  }

  return data as T;
}
