import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators/custom-validators';
import { Constants } from '../../../../shared/constants/constants';
import { Subject } from 'rxjs';
import { EmailAvailabilityValidator } from '../custom-validators/email-availability-validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  registrationForm: FormGroup;
  firebaseError: string;
  readonly invalidEmailMessage = Constants.VALID_EMAIL_MESSAGE;
  readonly passwordMinLengthMessage = Constants.PASSWORD_MIN_LENGTH_MESSAGE;
  readonly passwordContainsCapsMessage = Constants.PASSWORD_HAS_CAPS_MESSAGE;
  readonly passwordContainsLowerCaseMessage = Constants.PASSWORD_HAS_LOWER_CASE_MESSAGE;
  readonly passwordContainsNumberMessage = Constants.PASSWORD_HAS_NUMBER_MESSAGE;
  readonly passwordContainsSpecialCharacterMessage = Constants.PASSWORD_HAS_SPECIAL_CHARACTER_MESSAGE;
  readonly passwordConfirmationMessage = Constants.PASSWORD_CONFIRMATION_MESSAGE;

  constructor(private authenticationService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: [  '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
        [new EmailAvailabilityValidator(this.authenticationService)], onblur ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true})
      ])],
        confirmPassword: [null,
          [Validators.required]]},
      {validator: CustomValidators.passwordMatchValidator});
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  signUp() {
    this.authenticationService.signUp(this.registrationForm.get('email').value, this.registrationForm.get('password').value)
      .then(() => this.router.navigate(['/verify-email-address']))
      .catch((error) => {
        this.firebaseError = error.message;
        });
  }


}

