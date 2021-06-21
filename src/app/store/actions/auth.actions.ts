import { Action } from '@ngrx/store';

export interface User {
  email: string;
  password: string;
}

export const LOGIN_START = '[Auth] login start';
export const LOGIN_SUCCESS = '[Auth] login success';
export const LOGIN_FAILED = '[Auth] login failed';

export const REGISTER_START = '[Auth] register start';
export const REGISTER_SUCCESS = '[Auth] register success';
export const REGISTER_FAILED = '[Auth] register failed';

export const LOGOUT_START = '[Auth] logout';
export const LOGOUT_SUCCESS = '[Auth] logout success';
export const LOGOUT_FAILED = '[Auth] logout failed';

export const SET_IS_LOGGED_IN = '[Auth] is logged in';

export const OPEN_MODAL = '[Auth] open modal';
export const CLOSE_MODAL = '[Auth] close modal';

export class OpenModal implements Action {
  readonly type: string = OPEN_MODAL;

  constructor(public payload: boolean = true) {}
}

export class CloseModal implements Action {
  readonly type: string = CLOSE_MODAL;

  constructor(public payload: boolean = false) {}
}

// Login
export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class LoginSuccess implements Action {
  readonly type: string = LOGIN_SUCCESS;
  constructor(public payload: string) {}
}
export class LoginFailed implements Action {
  readonly type: string = LOGIN_FAILED;
  constructor(public payload: string) {}
}

// Register
export class RegisterStart implements Action {
  readonly type: string = REGISTER_START;
  constructor(public payload: User) {}
}
export class RegisterSuccess implements Action {
  readonly type: string = REGISTER_SUCCESS;
}
export class RegisterFailed implements Action {
  readonly type: string = REGISTER_FAILED;
  constructor(public payload: string) {}
}

// Logout
export class LogoutStart implements Action {
  readonly type: string = LOGOUT_START;
}
export class LogoutSuccess implements Action {
  readonly type: string = LOGOUT_SUCCESS;
}
export class LogoutFailed implements Action {
  readonly type: string = LOGOUT_FAILED;
}

export class SetIsLoggedIn implements Action {
  readonly type: string = SET_IS_LOGGED_IN;
  constructor(public payload: boolean) {}
}

export type AuthActions =
  | OpenModal
  | CloseModal
  | LoginStart
  | LoginSuccess
  | LoginFailed
  | RegisterStart
  | RegisterSuccess
  | RegisterFailed
  | LogoutStart
  | LogoutSuccess
  | LogoutFailed
  | SetIsLoggedIn;
