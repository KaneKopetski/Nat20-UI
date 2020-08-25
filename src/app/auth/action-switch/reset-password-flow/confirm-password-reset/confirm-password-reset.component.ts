import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../../common/constants';
import { AuthService } from '../../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../custom-validators/custom-validators';


@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {
  newPasswordForm: FormGroup;
  private oobCode: string;
  readonly passwordMinLengthMessage = Constants.PASSWORD_MIN_LENGTH_MESSAGE;
  readonly passwordContainsCapsMessage = Constants.PASSWORD_HAS_CAPS_MESSAGE;
  readonly passwordContainsLowerCaseMessage = Constants.PASSWORD_HAS_LOWER_CASE_MESSAGE;
  readonly passwordContainsNumberMessage = Constants.PASSWORD_HAS_NUMBER_MESSAGE;
  readonly passwordContainsSpecialCharacterMessage = Constants.PASSWORD_HAS_SPECIAL_CHARACTER_MESSAGE;
  readonly passwordConfirmationMessage = Constants.PASSWORD_CONFIRMATION_MESSAGE;

  constructor(private authenticationService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
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
    this.oobCode = this.route.snapshot.queryParams.oobCode;
  }

  resetPassword() {
    this.authenticationService.resetPassword(this.oobCode, this.newPasswordForm.get('password').value);
    this.router.navigate(['/reset-password-confirmation']);
  }


}
