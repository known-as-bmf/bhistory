export interface BHistory {
  getState(): BHistoryState;
  subscribe(): UnsubscribeFunction;
}

export interface BHistoryState {
  todo: any;
}

export type UnsubscribeFunction = () => void;
