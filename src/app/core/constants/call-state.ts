export interface ResultState<T> {
  result: T;
  callState: CallState;
}

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

export const CALL_STATE_KEY: keyof ResultState<any> = 'callState';
