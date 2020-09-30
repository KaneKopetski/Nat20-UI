import {Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, Inject, OnInit} from '@angular/core';
import { StyleRenderer, lyl, WithStyles } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperEvent, LyImageCropper, ImgCropperErrorEvent } from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { MatDialogRef } from '@angular/material/dialog';

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
  @ViewChild(LyImageCropper) cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    resizableArea: true,
    keepAspectRatio: true,
    // autoCrop: true,
    width: 300, // Default `250`
    height: 300, // Default `200`
    fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    output: {
      width: 300,
      height: 300
    }
  };

  constructor(readonly sRenderer: StyleRenderer,
              private platform: Platform,
              public dialogRef: MatDialogRef<EditProfileAvatarComponent>) {
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
  }

  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }

  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  uploadCroppedImage() {

  }

  close(): void {
    this.dialogRef.close();
  }

}
