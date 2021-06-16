import { Action } from '@ngrx/store';

export const OPEN_MODAL = 'OPEN_AUTH_MODAL';
export const CLOSE_MODAL = 'CLOSE_AUTH_MODAL';

export class OpenModal implements Action {
  readonly type: string = OPEN_MODAL;

  constructor(public payload: boolean = true) {}
}

export class CloseModal implements Action {
  readonly type: string = CLOSE_MODAL;

  constructor(public payload: boolean = false) {}
}

export type AuthActions = OpenModal | CloseModal;
