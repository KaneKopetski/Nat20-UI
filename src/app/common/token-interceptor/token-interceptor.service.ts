import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private excludedUrlsRegex: RegExp[];
  private excludedUrls = [ '.svg' ];

  constructor(private authService: AuthService) {
    this.excludedUrlsRegex = this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
  }

  // intercept2(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log('INTERCEPTOR');
  //   const token = this.authService.userToken;
  //   let newHeaders = req.headers;
  //   if (token) {
  //     newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //   if (!req.url.includes('.svg')) {
  //     const authReq = req.clone({headers: newHeaders});
  //     return next.handle(authReq).pipe(
  //       map(resp => {
  //         if (resp instanceof HttpResponse) {
  //           console.log(resp);
  //           return resp.clone({body: [{title: 'Replaced data in interceptor'}]});
  //         }
  //       })
  //     );
  //   }
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const passThrough: boolean =
      !!this.excludedUrlsRegex.find(regex => regex.test(req.url));

    if (passThrough) {
      return next.handle(req);
    }

    const token = this.authService.userToken;
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
    }

    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        const authReq = req.clone({headers: newHeaders});
        return next.handle(authReq).pipe(
          map(resp => {
            if (resp instanceof HttpResponse) {
              console.log(resp);
              return resp.clone({body: [{title: 'Replaced data in interceptor'}]});
            }
          })
        );
      }
    }));
  }
}
