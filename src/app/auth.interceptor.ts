import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    console.log(modifiedReq);
    return next.handle(modifiedReq);
  }
}
