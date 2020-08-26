import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  userData: Observable<firebase.User>;
  userToken: string;
  user: User;
  private sub: Subscription;

  get user$(): Observable<User|null> {
    return this.afAuth.user;
  }

  constructor(private afAuth: AngularFireAuth,
              public router: Router) {

    this.userData = afAuth.authState;
    this.sub = this.user$.subscribe( user => {
      this.user = user;
    });
    this.onInit();
  }

  onInit() {
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
        this.getTokenPromise();
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
        this.getTokenPromise();
      }).catch((error) => {
      });
  }

  getTokenPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged( user => {
        if (user) {
          user.getIdToken().then(idToken => {
            this.userToken = idToken;
            resolve(idToken);
          });
        }
      });
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
