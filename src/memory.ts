import { of, set, undo, redo, deref, subscribe } from '@known-as-bmf/store';

import { BHistory, BLocation, NavigateOptions } from './types';

export function createMemoryHistory(): BHistory {
  const history = of('', { historyDepth: Infinity });

  function location(): BLocation {
    return {
      path: deref(history),
    };
  }

  function navigate(
    to: string,
    // no supported for now
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { replace = false }: NavigateOptions = {}
  ): void {
    set(history, to);
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

  function listen(callback: (location: BLocation) => void): () => void {
    return subscribe(history, () => callback(location()));
  }

  return {
    location,
    navigate,
    back,
    forward,
    go,
    listen,
  };
}
