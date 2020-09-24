import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { UserProfileService } from '../user-profile.service';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { AuthService } from '../../../core/modules/authentication/auth.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  @ViewChild(ToastContainerDirective, {static: true})
  toastContainer: ToastContainerDirective;
  userProfileForm: FormGroup;
  user: firebase.User;
  loading = false;
  submitButtonText = 'Finish';
  newProfileAvatar: File;

  constructor(private fb: FormBuilder,
              private userProfileService: UserProfileService,
              private toastr: ToastrService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
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
          Validators.minLength(3)])],
      newProfileAvatar: ['']
    });
  }

  submitProfile() {
    // this.runSpinner();
    // const userProfile: FormData = new FormData();
    // userProfile.append('uid', this.user.uid);
    // userProfile.append('email', this.userProfileForm.get(['email']).value);
    // userProfile.append('newProfileAvatar', this.newProfileAvatar);
    // userProfile.append('displayName', this.userProfileForm.get(['displayName']).value);
    // this.authService.updateFirebaseUser(this.userProfileForm.get('displayName').value);
    // this.userProfileService.updateProfile(userProfile).subscribe(
    //   () => this.successMessage(),
    //   () => this.errorMessage());
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

  handleFileSelection(event: any) {
    this.newProfileAvatar = event.target.files[0];
  }



}
