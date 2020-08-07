import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from "../welcome/welcome.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { LoginComponent } from "../auth/login/login.component";
import { RegisterComponent } from "../auth/register/register.component";
import { EmailVerificationComponent } from "../auth/email-verification/email-verification.component";
import { ActionSwitchComponent } from "../auth/action-switch/action-switch.component";
import { ResetPasswordComponent } from "../auth/action-switch/reset-password-flow/reset-password/reset-password.component";
import { ResetPasswordConfirmationComponent } from "../auth/action-switch/reset-password-flow/reset-password-confirmation/reset-password-confirmation.component";
import { ResetPasswordEmailSentComponent } from "../auth/action-switch/reset-password-flow/reset-password-email-sent/reset-password-email-sent.component";
// import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, emailVerified, isNotAnonymous } from '@angular/fire/auth-guard';
import { CharactersLandingComponent } from "../characters/characters-landing/characters-landing.component";
// import {Observable, pipe, UnaryFunction} from "rxjs";
// import { map } from "rxjs/operators";
// import { User, auth } from 'firebase/app';
import { AuthGuard } from "../auth/guard/auth.guard";



// export const redirectUnauthorizedAndEmailInvalid = (redirect: any[]) =>
//   pipe(emailVerified, map(result => result || redirect)
//   );
//
// export const redirectIfEmailUnverified = (redirect: any[]) =>
//   pipe(emailVerified, map(loggedIn => redirect)
//   );
//
// const redirectUnauthorizedToLogin2 = () => redirectUnauthorizedAndEmailInvalid(['register']);
//
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectEmailUnverified = () => redirectIfEmailUnverified(['register'])
//
// type AuthPipe = UnaryFunction<Observable<User|null>, Observable<boolean|any[]>>;

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedAndEmailInvalid(['login']);
// const adminOnly = () => hasCustomClaim('admin');
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);
// const emailIsVerified: AuthPipe = map(user => !!user && user.emailVerified);
const ROUTES = [
  { path: 'home', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/error', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email-address', component: EmailVerificationComponent },
  { path: '_/auth/action', component: ActionSwitchComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-confirmation', component: ResetPasswordConfirmationComponent },
  { path: 'reset-password-email', component: ResetPasswordEmailSentComponent },
  { path: 'characters', component: CharactersLandingComponent, canActivate: [AuthGuard] },
  { path: 'character', component: CharactersLandingComponent, canActivate: [AuthGuard] },
  { path: 'c', component: CharactersLandingComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
