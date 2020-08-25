import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private excludedUrlsRegex: RegExp[];
  private excludedUrls = [ '.svg' ];

  constructor() {
    this.excludedUrlsRegex = this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const passThrough: boolean =
        !!this.excludedUrlsRegex.find(regex => regex.test(req.url));

      if (passThrough) {
        return next.handle(req);
      } else {

        const token = localStorage.getItem('userToken');
        let newHeaders = req.headers;
        if (token) {
          newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
        }
        const authReq = req.clone({headers: newHeaders});
        return next.handle(authReq).pipe(
          map(resp => {
            if (resp instanceof HttpResponse) {
              return resp;
            }
          })
        );
      }
  }

}
