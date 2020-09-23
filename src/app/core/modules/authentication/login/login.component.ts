import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../../../../shared/constants/constants';
import {ToastrService, ToastContainerDirective} from 'ngx-toastr';


const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorExists: boolean;
  errorMessage: string;
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;


  constructor(private authenticationService: AuthService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

    this.matIconRegistry.addSvgIcon('googleLogo', this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.errorMessage = Constants.MUST_BE_LOGGED_IN;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        email: [  '',
          [ Validators.required, Validators.email ]
        ],
        password: [ '', Validators.compose([
          Validators.required
        ])]});

    this.toastr.overlayContainer = this.toastContainer;

    this.errorExists = this.route.snapshot.queryParams.error;
    this.checkForError();
  }

  signInWithEmail() {
    this.authenticationService.signInWithEmail(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(() => {
        this.loginForm.reset();
        this.router.navigate(['']);
      }).catch((error) => {
        this.loginForm.setErrors({ invalid: true });
        this.addFirebaseErrorsToErrorsCollections(error.code);
    });
  }

  googleLogin() {
    this.authenticationService.googleAuth();
  }

  private addFirebaseErrorsToErrorsCollections(errorCode: string) {
    switch (errorCode) {
      case 'auth/user-not-found': {
        this.loginForm.get('email').setErrors({ userNotFound: true });
        break;
      }
      case 'auth/user-disabled': {
        this.loginForm.get('email').setErrors({ userDisabled: true });
        break;
      }
      case 'auth/wrong-password': {
        this.loginForm.get('password').setErrors({ invalidPassword: true });
        break;
      }
      default: {
        this.loginForm.get('email').setErrors({ unknownError: true });
        break;
      }
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return Constants.FIELD_REQUIRED_MESSAGE;
    } else if (this.loginForm.controls.email.hasError('email')) {
      return Constants.EMAIL_INVALID_MESSAGE;
    } else if (this.loginForm.controls.email.hasError('userNotFound')) {
      return Constants.USER_NOT_FOUND_MESSAGE;
    } else if (this.loginForm.controls.email.hasError('userDisabled')) {
      return Constants.USER_DISABLED_MESSAGE;
    } else if (this.loginForm.controls.email.hasError('unknownError')) {
      return Constants.UNKNOWN_ERROR_MESSAGE;
    }
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return Constants.FIELD_REQUIRED_MESSAGE;
    } else if (this.loginForm.controls.password.hasError('invalidPassword')) {
      return  Constants.WRONG_PASSWORD_MESSAGE;
    }
  }

  checkForError() {
    if (this.errorExists) {
      this.toastr.error('You must be logged in to access that resource', 'Error');
    }
  }



}
