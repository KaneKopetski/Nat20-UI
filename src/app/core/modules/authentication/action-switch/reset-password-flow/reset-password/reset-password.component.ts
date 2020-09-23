import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../../../shared/constants/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailExistsValidator } from '../../../custom-validators/email-exists-validator';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  readonly invalidEmailMessage = Constants.VALID_EMAIL_MESSAGE;
  requestPasswordResetForm: FormGroup;

  constructor(private authenticationService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.requestPasswordResetForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email, Validators.maxLength(50)],
        [new EmailExistsValidator(this.authenticationService)], onblur]
    });
  }

  sendResetPasswordEmail() {
    this.authenticationService.sendResetPasswordEmail(this.requestPasswordResetForm.get('email').value);
    this.router.navigate(['/reset-password-email']);
  }

}
