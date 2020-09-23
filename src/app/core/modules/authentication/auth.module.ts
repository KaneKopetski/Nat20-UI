import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { EmailVerifiedComponent } from './action-switch/email-verified/email-verified.component';
import { ActionSwitchComponent } from './action-switch/action-switch.component';
import { ConfirmPasswordResetComponent } from './action-switch/reset-password-flow/confirm-password-reset/confirm-password-reset.component';
import { ResetPasswordComponent } from './action-switch/reset-password-flow/reset-password/reset-password.component';
import { ResetPasswordConfirmationComponent } from './action-switch/reset-password-flow/reset-password-confirmation/reset-password-confirmation.component';
import { ResetPasswordEmailSentComponent } from './action-switch/reset-password-flow/reset-password-email-sent/reset-password-email-sent.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    EmailVerifiedComponent,
    ActionSwitchComponent,
    ConfirmPasswordResetComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent,
    ResetPasswordEmailSentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
