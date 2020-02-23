import { of, set, undo, redo, deref, subscribe } from '@known-as-bmf/store';

import { BHistory, BLocation, HistoryListener } from './types';
import { joinPath } from './url';

export function createMemoryHistory(): BHistory {
  const history = of<BLocation>({ path: '/' }, { historyDepth: Infinity });

  function location(): BLocation {
    return deref(history);
  }

  let listeners: HistoryListener[] = [];

  function notifyListeners(): void {
    listeners.forEach(l => l(location()));
  }

  function listen(listener: HistoryListener): () => void {
    const unsubscribe = subscribe(
      history,
      () => listener(location()),
      loc => loc.path
    );
    listeners = [...listeners, listener];

    return (): void => {
      unsubscribe();
      listeners = listeners.filter(l => l !== listener);
    };
  }

  function navigate(to: string): void {
    set(history, { path: joinPath(to) });
  }

  function back(): void {
    try {
      undo(history);
    } catch {
      //
    }
  }

  function forward(): void {
    try {
      redo(history);
    } catch {
      //
    }
  }

  function go(delta: number): void {
    try {
      delta > 0
        ? redo(history, Math.abs(delta))
        : undo(history, Math.abs(delta));
    } catch {
      //
    }
  }

  function reload(): void {
    notifyListeners();
  }

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
