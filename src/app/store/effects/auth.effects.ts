import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '@store/actions/auth.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  authLogin$: any = createEffect((): any => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((userData: AuthActions.LoginStart) =>
        this.authService
          .login(userData.payload.email, userData.payload.password)
          .pipe(
            map((res) => {
              return new AuthActions.LoginSuccess(res.accessToken);
            }),
            catchError((resError: HttpErrorResponse) => {
              return of(
                new AuthActions.LoginFailed(resError.error.error.message)
              );
            })
          )
      )
    );
  });

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap((res: { payload: string; type: string }) => {
          window.dispatchEvent(new Event('storage'));
          window.localStorage.setItem('accessToken', res.payload);
        })
      ),
    { dispatch: false }
  );

  authRegister$: any = createEffect((): any => {
    return this.actions$.pipe(
      ofType(AuthActions.REGISTER_START),
      switchMap((userData: AuthActions.RegisterStart) =>
        this.authService
          .register(userData.payload.email, userData.payload.password)
          .pipe(
            map((res) => {
              return new AuthActions.RegisterSuccess();
            }),
            catchError((resError: HttpErrorResponse) => {
              return of(
                new AuthActions.RegisterFailed(resError.error.error.message)
              );
            })
          )
      )
    );
  });

  authLogout$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT_START),
      switchMap(() =>
        this.authService.logout().pipe(
          map((res) => new AuthActions.LogoutSuccess()),
          catchError((error) => {
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private http: HttpClient
  ) {}
}
