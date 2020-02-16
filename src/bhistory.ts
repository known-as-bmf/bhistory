import { useMemo, useCallback, AnchorHTMLAttributes } from 'react';

function joinAbsolutePath(...fragments: string[]): string {
  const relativePath = fragments
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
    .join('/');

  return `/${relativePath}`;
}

function navigate(to: string, replace: boolean): void {
  if (!replace) {
    window.history.pushState(null, '', to);
  } else {
    window.history.replaceState(null, '', to);
  }
}

interface UseLinkHookResult {
  href: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  onClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
}

interface UseLinkHookOptions {
  replace?: boolean;
}

function createBrowserHistoryBundle(baseUrl: string) {
  return {
    useLink(
      to: string,
      { replace = false }: UseLinkHookOptions = {}
    ): UseLinkHookResult {
      const href = useMemo(() => joinAbsolutePath(baseUrl, to), [to]);
      const onClick = useCallback(() => navigate(to, replace), [to, replace]);

      return useMemo(() => ({ href, onClick }), [href, onClick]);
    },
  };
}
