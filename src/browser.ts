import {
  BrowserHistoryOptions,
  BHistory,
  BLocation,
  NavigateOptions,
  HistoryListener,
} from './types';
import { parseQuery, joinPath } from './url';

export function createBrowserHistory({
  basePath = '',
  useHash = false,
}: BrowserHistoryOptions = {}): BHistory {
  // sanitize basePath
  basePath = joinPath(basePath);

  function location(): BLocation {
    return {
      path: window.location.pathname,
      query: parseQuery(window.location.search),
      hash: window.location.hash.slice(1) || undefined,
    };
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
    const path = `${useHash ? '#' : ''}${joinPath(basePath, to)}`;
    if (!replace) {
      window.history.pushState({}, '', path);
    } else {
      window.history.replaceState({}, '', path);
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
    window.history.go(delta);
  }

  window.addEventListener('popstate', notifyListeners);

  return {
    location,
    navigate,
    back,
    forward,
    go,
    listen,
  };
}
