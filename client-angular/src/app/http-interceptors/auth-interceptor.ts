import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Interceptor to add authorization token in http requests' headers. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    if (!authToken) return next.handle(req);

    const authReq = req.clone({
      headers: req.headers.set('auth-token', authToken),
    });

    return next.handle(authReq);
  }
}
