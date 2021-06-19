import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

interface AuthResponseData {
  _id: string;
  refreshToken: string;
  expiresIn: string;
}

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
    return this.http.post<AuthResponseData>(
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
}
