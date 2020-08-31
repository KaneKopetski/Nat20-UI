import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { UserProfileService } from '../user-profile/user-profile.service';
import {UserProfileModel} from '../user-profile/user-profile-model';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  userData: Observable<firebase.User>;
  private sub: Subscription;
  private userCredential: UserCredential;
  token: string;

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
    this.sub = this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.setToken(user).then(() => {
          this.saveProfileIfNewUser();
        });
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setToken(user: User) {
    return user.getIdToken(true).then(res => {
      this.token = res;
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
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      this.userData = null;
      this.router.navigate(['/home']);
    });
  }

  googleAuth() {
    console.log('Google auth');
    this.authLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['/']);
    });
  }

  authLogin(provider) {
    console.log('Auth login');
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.userCredential = result;
        console.log('Result: ');
        console.log('Credential:');
      }).catch((error) => {
        console.log(error);
      });
  }

  saveProfileIfNewUser() {
    if (this.userCredential && this.userCredential.additionalUserInfo.isNewUser) {
      this.userProfileService.getOrCreateProfile(
        this.mapFirebaseUserToUserProfile(this.userCredential.user))
        .subscribe(result => {
          this.userProfileService.userProfile = result;
        });
    }
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
