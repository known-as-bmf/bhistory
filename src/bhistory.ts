import { BHistoryState, UnsubscribeFunction, BHistory } from './types';

export const createHistory = (): BHistory => {
  return {
    getState(): BHistoryState {
      return null as any;
    },
    subscribe(): UnsubscribeFunction {
      return (): void => {
        return;
      };
    },
  };
};
