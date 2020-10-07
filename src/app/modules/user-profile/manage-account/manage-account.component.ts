import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserProfileService} from '../user-profile.service';
import {ToastrService, ToastContainerDirective} from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  userProfileForm: FormGroup;
  loading = false;
  submitButtonText = 'Finish';

  constructor(private fb: FormBuilder,
              private userProfileService: UserProfileService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.toastr.overlayContainer = this.toastContainer;
  }

  createForm() {
    this.userProfileForm = this.fb.group({
      email: [
        this.userProfileService.userProfile.email, Validators.compose([
          Validators.email,
          Validators.maxLength(50)
        ])
      ],
      displayName: [
        this.userProfileService.userProfile.displayName, Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(3)
        ])
      ],
      aboutMe: [
        this.userProfileService.userProfile.aboutMe ? this.userProfileService.userProfile.aboutMe : '', Validators.maxLength(3000)
      ]
    });
  }

  submitProfile() {
    this.runSpinner();
    const userProfile = new FormData();
    userProfile.append('email', this.userProfileForm.get(['email']).value);
    userProfile.append('displayName', this.userProfileForm.get(['displayName']).value);
    userProfile.append('uid', this.userProfileService.userProfile.uid);
    userProfile.append('aboutMe', this.userProfileForm.get(['aboutMe']).value);
    this.userProfileService.updateProfile(userProfile).subscribe(
      success => this.successMessage(),
      error => this.errorMessage());
  }

  successMessage() {
      this.toastr.success('User profile updated successfully!', 'Success!');
      this.loading = false;
      this.submitButtonText = 'Finish';
  }

  errorMessage() {
    this.toastr.error('An error has occurred. Please try again later.', 'Womp womp');
    this.loading = false;
    this.submitButtonText = 'Finish';
  }

  runSpinner() {
    this.submitButtonText = '';
    this.loading = true;
  }

}
