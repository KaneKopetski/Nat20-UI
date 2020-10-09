import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { PageNotFoundComponent } from '../../components/error-components/page-not-found/page-not-found.component';
import { LoginComponent } from '../authentication/login/login.component';
import { RegisterComponent } from '../authentication/register/register.component';
import { EmailVerificationComponent } from '../authentication/email-verification/email-verification.component';
import { ActionSwitchComponent } from '../authentication/action-switch/action-switch.component';
import { ResetPasswordComponent } from '../authentication/action-switch/reset-password-flow/reset-password/reset-password.component';
import { ResetPasswordConfirmationComponent } from '../authentication/action-switch/reset-password-flow/reset-password-confirmation/reset-password-confirmation.component';
import { ResetPasswordEmailSentComponent } from '../authentication/action-switch/reset-password-flow/reset-password-email-sent/reset-password-email-sent.component';
import { CharactersLandingComponent } from '../../../modules/character-builder/characters-landing/characters-landing.component';
import { AuthGuard } from '../authentication/guard/auth-guard/auth.guard';
import { ManageAccountComponent } from '../../../modules/user-profile/manage-account/manage-account.component';
import { ProfileDetailComponent } from '../../../modules/user-profile/profile-detail/profile-detail.component';
import { OwnerGuard } from '../authentication/guard/owner-guard/owner.guard';
import {EditProfileAvatarComponent} from '../../../modules/user-profile/edit-profile-avatar/edit-profile-avatar.component';

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
  { path: 'profile', component: ManageAccountComponent, canActivate: [AuthGuard, OwnerGuard] },
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
