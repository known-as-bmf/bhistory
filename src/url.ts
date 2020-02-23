import { Query } from './types';

export function joinPath(...fragments: string[]): string {
  return (
    '/' +
    fragments
      .map(f => f.trim())
      .filter(f => f.length > 0)
      .map(f => {
        let cleanedFragment = f;
        if (f.startsWith('/')) {
          cleanedFragment = f.slice(1);
        }
        if (f.endsWith('/')) {
          cleanedFragment = f.slice(0, -1);
        }
        return cleanedFragment;
      })
      .filter(f => f.length > 0)
      .join('/')
  );
}

export function parseQuery(queryString: string): Query | undefined {
  // no query params, shortcut execution
  if (queryString === '') return;

  const pairs = (queryString.startsWith('?')
    ? queryString.substr(1)
    : queryString
  ).split('&');

  return pairs.reduce<Query>((query, pair) => {
    const [key, value] = pair
      .split('=')
      .map(s => decodeURIComponent(s || '').trim());

    const resolvedValue = value || true;
    const existing = query[key];

    if (existing) {
      if (typeof existing === 'boolean') {
        query[key] = resolvedValue;
      } else if (typeof resolvedValue === 'string') {
        if (Array.isArray(existing)) {
          query[key] = [...existing, resolvedValue];
        } else {
          query[key] = [existing, resolvedValue];
        }
      }
    } else {
      query[key] = resolvedValue;
    }

    return query;
  }, Object.create(null));
}
