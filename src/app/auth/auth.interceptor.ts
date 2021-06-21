import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      const mReq = req.clone({
        headers: req.headers.set('authorization', `Bearer ${accessToken}`),
      });
      return next.handle(mReq);
    }
    return next.handle(req);
  }
}
