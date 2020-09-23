import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { User } from 'firebase';
import {UserProfileService} from '../../../modules/user-profile/user-profile.service';
import {Constants} from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  userData: Observable<User>;
  private sub: Subscription;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private userProfileService: UserProfileService) {

    this.onInit();
  }

  onInit() {
    this.userData = this.afAuth.authState;
    this.userData.subscribe(user => {
      if (user) {
        sessionStorage.setItem(Constants.USER_KEY, JSON.stringify(user));
        user.getIdToken(true).then(res => {
          sessionStorage.setItem(Constants.USER_TOKEN_KEY, res);
        }).then(() => {
          this.getOrSaveProfile();
        });
      } else {
        sessionStorage.setItem(Constants.USER_KEY, null);
        sessionStorage.setItem(Constants.USER_TOKEN_KEY, null);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCurrentUser(): User {
    return JSON.parse(sessionStorage.getItem(Constants.USER_KEY));
  }

  getUserToken(): string {
    return sessionStorage.getItem(Constants.USER_TOKEN_KEY);
  }

  removeTokensFromSessionStorage() {
    sessionStorage.removeItem(Constants.USER_KEY);
    sessionStorage.removeItem(Constants.USER_TOKEN_KEY);
  }

  // TODO: Add handling for the returned user profile. Should be set in tool bar
  getOrSaveProfile() {
      const userProfileForm = new FormData();
      const user: User = this.getCurrentUser();
      userProfileForm.append('uid', user.uid);
      userProfileForm.append('displayName', user.displayName);
      userProfileForm.append('email', user.email);
      this.userProfileService.getOrCreateProfile(userProfileForm)
        .subscribe(result => {
          console.log(result);
        });
  }

  signInWithEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        return result;
      });
  }

  signOutAndRedirect() {
    return this.afAuth.signOut().then(() => {
      this.removeTokensFromSessionStorage();
      this.userData = null;
      this.router.navigate(['/home']);
    });
  }

  googleAuth() {
    this.authLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['/']);
    });
  }

  authLogin(provider) {
    console.log('Auth login');
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
  }

  sendVerificationMail() {
    this.afAuth.onAuthStateChanged(user => user.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email-address']);
      });
  }

  signUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        return result;
      });
  }

  getProvidersObservable(email: string): Observable<string[]> {
    return from(this.afAuth.fetchSignInMethodsForEmail(email)
      .then((result) => {
        return result;
      }));
  }

  setEmailVerified(actionCode: string) {
    this.afAuth.applyActionCode(actionCode);
  }

  sendResetPasswordEmail(email: string) {
    this.afAuth.sendPasswordResetEmail(email)
      .then((result) => {
        return result;
      });
  }

  resetPassword(oobCode: string, newPassword: string) {
    this.afAuth.confirmPasswordReset(oobCode, newPassword)
      .then((result) => {
        return result;
      });
  }

}
