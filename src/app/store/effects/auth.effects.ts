import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/actions/auth.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { setAccessToken } from 'src/shared/set-access-token';
import * as fromApp from '@store/index';

@Injectable()
export class AuthEffects {
  authLogin$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((userData: AuthActions.LoginStart) =>
        this.authService
          .login(userData.payload.email, userData.payload.password)
          .pipe(
            map((res) => {
              return new AuthActions.LoginSuccess(res.accessToken);
            }),
            catchError((resError: HttpErrorResponse) => {
              let error;
              switch (resError.status) {
                case 401:
                  error = 'Incorrect email or password';
                  break;
                case 422:
                  error = 'Invalid email or password';
                  break;
                default:
                  error = 'Internal server error';
              }
              return of(new AuthActions.LoginFailed(error));
            })
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap((res: { payload: string; type: string }) => {
          window.dispatchEvent(new Event('storage'));
          setAccessToken(res.payload);
        })
      ),
    { dispatch: false }
  );

  authRegister$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_START),
      switchMap((userData: AuthActions.RegisterStart) =>
        this.authService
          .register(userData.payload.email, userData.payload.password)
          .pipe(
            map((res) => {
              return new AuthActions.RegisterSuccess();
            }),
            catchError((resError: HttpErrorResponse) => {
              let error;
              switch (resError.status) {
                case 409:
                  error = 'Email already exists';
                  break;
                case 422:
                  error = 'Invalid email or password';
                  break;
                default:
                  error = 'Internal server error';
              }
              return of(new AuthActions.RegisterFailed(error));
            })
          )
      )
    )
  );

  authLogout$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT_START),
      switchMap(() =>
        this.authService.logout().pipe(
          map((res) => new AuthActions.LogoutSuccess()),
          catchError((resError: HttpErrorResponse) => {
            return of(new AuthActions.LogoutFailed());
          })
        )
      )
    )
  );

  logoutSuccess$: any = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT_SUCCESS),
        tap(() => {
          window.localStorage.removeItem('accessToken');
        })
      ),
    { dispatch: false }
  );

  tokenValidation$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.TOKEN_VALIDATION_START),
      switchMap(() => {
        return this.authService.validateTokens().pipe(
          map(() => new AuthActions.TokenValidationSuccess()),
          catchError((resError: HttpErrorResponse) => {
            return of(
              new AuthActions.TokenValidationFailed(resError.statusText)
            );
          })
        );
      })
    )
  );

  tokenValidationSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.TOKEN_VALIDATION_SUCCESS),
      map((_) => new AuthActions.SetIsLoggedIn(true))
    )
  );

  tokenValidationFail$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.TOKEN_VALIDATION_FAILED),
      map((_) => new AuthActions.SetIsLoggedIn(false))
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
