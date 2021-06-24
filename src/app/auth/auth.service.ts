import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = 'http://localhost:8080/api/auth';
  token?: string;
  constructor(private http: HttpClient) {}

  public register(email: string, password: string) {
    return this.http.post(
      `${this.url}/register`,
      { email, password },
      { responseType: 'text' }
    );
  }

  public login(email: string, password: string) {
    return this.http.post<{ accessToken: string }>(
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

  public logout() {
    return this.http.delete(`${this.url}/logout`, { withCredentials: true });
  }

  public validateTokens() {
    return this.http.post(`${this.url}/validate-tokens`, null, {
      withCredentials: true,
      responseType: 'text',
    });
  }
}
