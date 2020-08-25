import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userData: Observable<firebase.User>;
  isAuthorized: boolean;
  userRoute: string;

  constructor(private authService: AuthService,
              private router: Router) {

    this.userData = this.authService.userData;

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userRoute = '/' + next.url.toString();

    this.userData.subscribe(userData => {
      if (!userData) {
        this.router.navigate(['/login'], { queryParams: { error: true } });
        this.isAuthorized = false;
      } else if (!userData.emailVerified) {
        this.router.navigate(['/register']);
        this.isAuthorized = false;
      } else {
        this.router.navigate([this.userRoute]);
        this.isAuthorized = true;
      }
    });
    return this.isAuthorized;
  }



}
