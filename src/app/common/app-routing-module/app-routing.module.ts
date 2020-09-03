import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { PageNotFoundComponent } from '../../error-components/page-not-found/page-not-found.component';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { EmailVerificationComponent } from '../../auth/email-verification/email-verification.component';
import { ActionSwitchComponent } from '../../auth/action-switch/action-switch.component';
import { ResetPasswordComponent } from '../../auth/action-switch/reset-password-flow/reset-password/reset-password.component';
import { ResetPasswordConfirmationComponent } from '../../auth/action-switch/reset-password-flow/reset-password-confirmation/reset-password-confirmation.component';
import { ResetPasswordEmailSentComponent } from '../../auth/action-switch/reset-password-flow/reset-password-email-sent/reset-password-email-sent.component';
import { CharactersLandingComponent } from '../../character-builder/characters-landing/characters-landing.component';
import { AuthGuard } from '../../auth/guard/auth-guard/auth.guard';
import { EditUserProfileComponent } from '../../user-profile/edit-user-profile/edit-user-profile.component';
import { ProfileDetailComponent } from '../../user-profile/profile-detail/profile-detail.component';
import { OwnerGuard } from '../../auth/guard/owner-guard/owner.guard';

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
  { path: 'profile', component: EditUserProfileComponent, canActivate: [AuthGuard, OwnerGuard] },
  { path: 'view-profile/:uid', component: ProfileDetailComponent },
  { path: 'not-found', component: PageNotFoundComponent },
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
