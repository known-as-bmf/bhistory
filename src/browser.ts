import {
  BrowserHistoryOptions,
  BHistory,
  BLocation,
  NavigateOptions,
  HistoryListener,
} from './types';
import { parseQuery, joinPath } from './url';

export function createBrowserHistory({
  basePath = '/',
  useHash = false,
}: BrowserHistoryOptions = {}): BHistory {
  function location(): BLocation {
    const { pathname, search, hash } = window.location;

    const loc: BLocation = {
      path: useHash ? hash.slice(1) : pathname,
    };

    const query = parseQuery(search);
    if (query) {
      loc.query = query;
    }

    const cleanedHash = window.location.hash.slice(1);
    if (!useHash && cleanedHash) {
      loc.hash = cleanedHash;
    }

    return loc;
  }

  let listeners: HistoryListener[] = [];

  function notifyListeners(): void {
    listeners.forEach(l => l(location()));
  }

  function listen(listener: HistoryListener): () => void {
    listeners = [...listeners, listener];
    return (): void => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  function navigate(
    to: string,
    { replace = false }: NavigateOptions = {}
  ): void {
    let nextPath = joinPath(basePath, to);
    const { path: currentPath } = location();

    if (nextPath === currentPath) {
      return;
    }

    nextPath = `${useHash ? '#' : ''}${nextPath}`;
    if (!replace) {
      window.history.pushState({}, '', nextPath);
    } else {
      window.history.replaceState({}, '', nextPath);
    }

    notifyListeners();
  }

  function back(): void {
    window.history.back();
  }

  function forward(): void {
    window.history.forward();
  }

  function go(delta: number): void {
    if (delta === 0) {
      return;
    }

    window.history.go(delta);
  }

  function reload(): void {
    notifyListeners();
  }

  if (useHash) {
    window.location.hash = '/';
  }

  window.addEventListener('popstate', notifyListeners);

  return {
    location,
    navigate,
    back,
    forward,
    go,
    reload,
    listen,
  };
}
