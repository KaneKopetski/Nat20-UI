import {Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, Inject, OnInit} from '@angular/core';
import { StyleRenderer, lyl, WithStyles } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperEvent, LyImageCropper, ImgCropperErrorEvent } from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';


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
    // fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    output: {
      width: 300,
      height: 300
    }
  };

  // tslint:disable-next-line:max-line-length
  src = 'https://nat20profileavatars.s3.amazonaws.com/2020-09-20T22%3A44%3A13.027797900_red-dragon-around-d20-transparent.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200928T205907Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAWNT52FOL6HDCP2EJ%2F20200928%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9159970f9244a1b99b99ca2c78bf1d6e76098d065cbd019373c85406ce24a17f';

  constructor(readonly sRenderer: StyleRenderer,
              private platform: Platform) {
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
        // tslint:disable-next-line:max-line-length
        'https://nat20profileavatars.s3.amazonaws.com/2020-09-20T22%3A44%3A13.027797900_red-dragon-around-d20-transparent.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200928T220230Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAWNT52FOL6HDCP2EJ%2F20200928%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b408e4ce00f7ac4f6461181a0a71f512f316a52e5fe43edeeee02a97fdaa27e8',
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

  // close(): void {
  //   this.dialogRef.close(this.croppedImageUrl);
  // }

}
