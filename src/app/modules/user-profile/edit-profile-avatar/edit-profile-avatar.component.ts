import {Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, Inject, OnInit} from '@angular/core';
import { StyleRenderer, lyl, WithStyles } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperEvent, LyImageCropper, ImgCropperErrorEvent } from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


const STYLES = () => ({
  cropper: lyl `{
    max-width: 400px
    height: 300px
  }`,
  sliderContainer: lyl `{
    text-align: center
    max-width: 400px
    margin: 14px
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
export class EditProfileAvatarComponent implements WithStyles, AfterViewInit {
  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage?: string;
  scale: number;
  ready: boolean;
  minScale: number;
  private croppedImageUrl: string;
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
              public dialogRef: MatDialogRef<EditProfileAvatarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngAfterViewInit() {
    // demo: Load image from URL and update position, scale, rotate
    // this is supported only for browsers
    if (this.platform.isBrowser) {
      const config = {
        scale: 0.745864772531767,
        position: {
          xOrigin: 642.380608078103,
          yOrigin: 236.26357452128866
        }
      };
      this.cropper.setImageUrl(
        this.data,
        () => {
          this.cropper.setScale(config.scale, true);
          this.cropper.updatePosition(config.position.xOrigin, config.position.yOrigin);
          // You can also rotate the image
          // this.cropper.rotate(90);
        }
      );
    }

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
    this.dialogRef.close(this.croppedImageUrl);
  }

}
