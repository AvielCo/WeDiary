import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '@store/actions/auth.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { setAccessToken } from 'src/shared/access-token';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  loginStart$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((userData: AuthActions.LoginStart) =>
        this.authService
          .login(userData.payload.email, userData.payload.password)
          .pipe(
            map((res) => {
              return new AuthActions.LoginSuccess(res.at);
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
        tap(
          (res: {
            payload: { accessToken: string; expireDate: number };
            type: string;
          }) => {
            setAccessToken(res.payload);
            window.dispatchEvent(new Event('storage'));
            this.router.navigate(['/events']);
            this.authService.autoLogout(5000);
          }
        )
      ),
    { dispatch: false }
  );

  registerStart$: any = createEffect((): any =>
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

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.REGISTER_SUCCESS),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
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
          window.dispatchEvent(new Event('storage'));
          this.router.navigate(['/']);
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
            let error;
            switch (resError.status) {
              case 401:
                error = 'You need to log in';
                break;
              case 403:
                error = 'You need to log in';
                break;
              default:
                error = 'Internal server error';
            }
            return of(new AuthActions.TokenValidationFailed(error));
          })
        );
      })
    )
  );

  tokenValidationSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.TOKEN_VALIDATION_SUCCESS),
      map((_) => {
        return new AuthActions.SetIsLoggedIn(true);
      })
    )
  );

  tokenValidationFail$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.TOKEN_VALIDATION_FAILED),
      map((_) => new AuthActions.SetIsLoggedIn(false))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
