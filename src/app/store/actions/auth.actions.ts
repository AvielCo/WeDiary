import { Action } from '@ngrx/store';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export class OpenAuthModal implements Action {
  readonly type: string = OPEN_MODAL;

  constructor(public payload: boolean = true) {}
}

export class CloseAuthModal implements Action {
  readonly type: string = CLOSE_MODAL;

  constructor(public payload: boolean = false) {}
}

export type AuthActions = OpenAuthModal | CloseAuthModal;
