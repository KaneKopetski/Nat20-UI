import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {UserProfileService} from '../user-profile.service';
import {UserProfileModel} from '../user-profile-model';
import {ToastrService, ToastContainerDirective} from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  userProfileForm: FormGroup;
  user: firebase.User;
  loading = false;
  submitButtonText = 'Finish';

  constructor(private fb: FormBuilder,
              private userProfileService: UserProfileService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.createForm();
    this.toastr.overlayContainer = this.toastContainer;

  }

  createForm() {
    this.userProfileForm = this.fb.group({
      email: [  this.user.email,
        [Validators.email, Validators.maxLength(50)]
      ],
      displayName: [ this.user.displayName, Validators.compose(
        [Validators.maxLength(50),
          Validators.minLength(3)])]
    });
  }

  submitProfile() {
    this.runSpinner();
    const userProfileModel: UserProfileModel = new UserProfileModel();
    userProfileModel.displayName = this.userProfileForm.get(['email']).value;
    userProfileModel.email = this.userProfileForm.get(['displayName']).value;
    this.userProfileService.saveProfile(userProfileModel).subscribe(
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
