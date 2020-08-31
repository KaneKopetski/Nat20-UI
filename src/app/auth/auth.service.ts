import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { UserProfileService } from '../user-profile/user-profile.service';
import {UserProfileModel} from '../user-profile/user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  userData: Observable<firebase.User>;
  user: User;
  private sub: Subscription;

  get user$(): Observable<User|null> {
    return this.afAuth.user;
  }

  get userFromLocalStorage$(): firebase.User {
    return JSON.parse(localStorage.getItem('user'));
  }

  constructor(private afAuth: AngularFireAuth, private router: Router, private userProfileService: UserProfileService) {
    this.onInit();
  }

  onInit() {
    this.userData = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));

        user.getIdToken().then(res => {
          localStorage.setItem('userToken', res);
        });
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('userToken', null);
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
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

  mapFirebaseUserToUserProfile(user: firebase.User): UserProfileModel {
    const newProfile: UserProfileModel = new UserProfileModel();
    newProfile.uid = user.uid;
    newProfile.displayName = user.displayName;
    newProfile.email = user.email;
    return newProfile;
  }

}
