import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor, } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const XSRF_HEADER_NAME = 'X-XSRF-TOKEN';

export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(
      private tokenService: HttpXsrfTokenExtractor,
  ) {} 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const token = this.tokenService.getToken();

    if (token !== null) {
      req = req.clone({headers: req.headers.set(XSRF_HEADER_NAME, token)});
    }
    return next.handle(req);
  }
}