import { Component, ChangeDetectionStrategy, ViewChild, Inject } from '@angular/core';
import { StyleRenderer, lyl, WithStyles } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperEvent, LyImageCropper, ImgCropperErrorEvent } from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserProfileResponse} from '../user-profile-response';
import {UserProfileService} from '../user-profile.service';

const STYLES = () => ({
  cropper: lyl `{
    width: 400px
    height: 400px
    border: 1px dashed orange
    margin-bottom: 15px
  }`
});

@Component({
  selector: 'app-edit-profile-avatar',
  templateUrl: './edit-profile-avatar.component.html',
  styleUrls: ['./edit-profile-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class EditProfileAvatarComponent implements WithStyles {
  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage?: string;
  scale: number;
  ready: boolean;
  minScale: number;
  loading = false;
  submitButtonText = 'Set as profile avatar';

  @ViewChild(LyImageCropper) cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    resizableArea: true,
    keepAspectRatio: true,
    width: 300,
    height: 300,
    type: 'image/png',
    output: {
      width: 300,
      height: 300
    }
  };

  constructor(readonly sRenderer: StyleRenderer,
              private platform: Platform,
              public dialogRef: MatDialogRef<EditProfileAvatarComponent>,
              private userProfileService: UserProfileService,
              @Inject(MAT_DIALOG_DATA)private data: UserProfileResponse) {
  }

  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }

  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  uploadCroppedImage(e: ImgCropperEvent) {
    this.runSpinner();
    const userProfileForm = new FormData();
    const blob = this.b64toBlob(e.dataURL, e.type);
    userProfileForm.append('uid', this.data.uid);
    userProfileForm.append('displayName', this.data.displayName);
    userProfileForm.append('newProfileAvatar', blob);
    userProfileForm.append('email', this.data.email);
    userProfileForm.append('aboutMe', this.data.aboutMe);
    this.userProfileService.updateProfile(userProfileForm).subscribe(result => {
      this.userProfileService.userProfile = result;
      this.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  b64toArrayBuffer(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const buffer = new ArrayBuffer(byteString.length);
    const array = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }
    return array;
  }

  private b64toBlob(dataURI, mimetype) {
    return new Blob([this.b64toArrayBuffer(dataURI)], {
      type: mimetype
    });
  }

  runSpinner() {
    this.loading = true;
    this.submitButtonText = '';
  }

}
