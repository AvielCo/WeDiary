import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAccessToken } from '@shared/access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const at = getAccessToken();
    if (at) {
      const mReq = req.clone({
        headers: req.headers.set(
          'authorization',
          `Bearer ${JSON.stringify(at)}`
        ),
      });
      return next.handle(mReq);
    }
    return next.handle(req);
  }
}
