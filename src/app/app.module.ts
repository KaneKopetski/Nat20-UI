import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing-module/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material-module/angular-material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { EmailVerificationComponent } from './auth/email-verification/email-verification.component';
import { EmailVerifiedComponent } from './auth/action-switch/email-verified/email-verified.component';
import { ActionSwitchComponent } from './auth/action-switch/action-switch.component';
import { ConfirmPasswordResetComponent } from './auth/action-switch/reset-password-flow/confirm-password-reset/confirm-password-reset.component';
import { ResetPasswordComponent } from './auth/action-switch/reset-password-flow/reset-password/reset-password.component';
import { ResetPasswordConfirmationComponent } from './auth/action-switch/reset-password-flow/reset-password-confirmation/reset-password-confirmation.component';
import { ResetPasswordEmailSentComponent } from './auth/action-switch/reset-password-flow/reset-password-email-sent/reset-password-email-sent.component';
import { CharactersLandingComponent } from './characters/characters-landing/characters-landing.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { MaterialElevationDirective } from './material-elevation.directive';
import { FlipCardComponent } from './characters/flip-card/flip-card.component';
import {TokenInterceptorService} from './token-interceptor/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    EmailVerifiedComponent,
    ActionSwitchComponent,
    ConfirmPasswordResetComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent,
    ResetPasswordEmailSentComponent,
    CharactersLandingComponent,
    MaterialElevationDirective,
    FlipCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
