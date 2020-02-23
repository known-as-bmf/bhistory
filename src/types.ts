export type Query = { [key: string]: true | string | string[] };

export interface BLocation {
  path: string;
  query?: Query;
  hash?: string;
}

export interface BHistory {
  location(): BLocation;
  navigate(to: string, options?: NavigateOptions): void;
  back(): void;
  forward(): void;
  go(delta: number): void;
  reload(): void;
  listen(listener: (location: BLocation) => void): () => void;
}

export interface NavigateOptions {
  replace?: boolean;
}

export interface BrowserHistoryOptions {
  basePath?: string;
  useHash?: boolean;
}

export type HistoryListener = (location: BLocation) => void;
