import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccessToken } from '@shared/access-token';
import * as fromApp from '@store/index';
import * as AuthActions from '@store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = 'http://localhost:8080/api/auth';
  private tokenExpTimer: any;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  public register(email: string, password: string) {
    return this.http.post(
      `${this.url}/register`,
      { email, password },
      { responseType: 'text' }
    );
  }

  public login(email: string, password: string) {
    return this.http.post<{ at: { accessToken: string; expireDate: number } }>(
      `${this.url}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  public autoLogin() {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return;
    }
    const expireDate = accessToken.expireDate - new Date().getTime(); // max 1 hour
    this.autoLogout(expireDate);
    return accessToken;
  }

  public autoLogout(expireDate: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.TokenValidationStart());
    }, expireDate);
  }

  public logout() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
    return this.http.delete(`${this.url}/logout`, { withCredentials: true });
  }

  public validateTokens() {
    return this.http.post(`${this.url}/validate-tokens`, null, {
      withCredentials: true,
      responseType: 'text',
    });
  }
}
