Wrapper around browser history with a nicer API. Can also build an in-memory history.

[![Build Status](https://travis-ci.org/known-as-bmf/bhistory.svg?branch=master)](https://travis-ci.org/known-as-bmf/bhistory)

# API

```ts
function createBrowserHistory(options?: BrowserHistoryOptions): BHistory;
function createMemoryHistory(): BHistory;
```

```ts
interface BrowserHistoryOptions {
  basePath?: string;
  useHash?: boolean;
}
```

```ts
interface BHistory {
  location(): BLocation;
  navigate(to: string, options?: NavigateOptions): void;
  back(): void;
  forward(): void;
  go(delta: number): void;
  reload(): void;
  listen(listener: (location: BLocation) => void): () => void;
}

interface BLocation {
  path: string;
  query?: Query;
  hash?: string;
}

interface NavigateOptions {
  replace?: boolean;
}
```
