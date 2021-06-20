import { Action, createAction } from '@ngrx/store';

export const LOGOUT = 'LOGOUT';
export const OPEN_MODAL = 'OPEN_AUTH_MODAL';
export const CLOSE_MODAL = 'CLOSE_AUTH_MODAL';
export const LOGIN = 'SET_IS_LOGGED_IN';

export interface User {
  email: string;
  password: string;
}

export class OpenModal implements Action {
  readonly type: string = OPEN_MODAL;

  constructor(public payload: boolean = true) {}
}

export class CloseModal implements Action {
  readonly type: string = CLOSE_MODAL;

  constructor(public payload: boolean = false) {}
}

export class Login implements Action {
  readonly type: string = LOGIN;
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export type AuthActions = OpenModal | CloseModal | Login | Logout;
