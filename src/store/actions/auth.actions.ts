import { Action } from '@ngrx/store';

export interface User {
  email: string;
  password: string;
}

export const LOGIN_START = '[Auth] login';
export const LOGIN_SUCCESS = '[Auth] login success';
export const LOGIN_FAILED = '[Auth] login failed';

export const REGISTER_START = '[Auth] register';
export const REGISTER_SUCCESS = '[Auth] register success';
export const REGISTER_FAILED = '[Auth] register failed';

export const LOGOUT_START = '[Auth] logout';
export const LOGOUT_SUCCESS = '[Auth] logout success';
export const LOGOUT_FAILED = '[Auth] logout failed';

export const TOKEN_VALIDATION_START = '[Auth] token validation';
export const TOKEN_VALIDATION_SUCCESS = '[Auth] token validation success';
export const TOKEN_VALIDATION_FAILED = '[Auth] token validation failed';

export const SET_IS_LOGGED_IN = '[Auth] is logged in';

export class SetIsLoggedIn implements Action {
  readonly type: string = SET_IS_LOGGED_IN;
  constructor(public payload: boolean) {}
}

// Login
export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(
    public payload: { email: string; password: string; close: any }
  ) {}
}
export class LoginSuccess implements Action {
  readonly type: string = LOGIN_SUCCESS;
  constructor(public payload: { accessToken: string; expireDate: number }) {}
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

export class TokenValidationStart implements Action {
  readonly type: string = TOKEN_VALIDATION_START;
}
export class TokenValidationSuccess implements Action {
  readonly type: string = TOKEN_VALIDATION_SUCCESS;
}
export class TokenValidationFailed implements Action {
  readonly type: string = TOKEN_VALIDATION_FAILED;
  constructor(public payload: string) {}
}

export type AuthActions =
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
