import { NgModule } from '@angular/core';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { EditProfileAvatarComponent} from './edit-profile-avatar/edit-profile-avatar.component';
import {LySliderModule} from '@alyle/ui/slider';
import {LyImageCropperModule} from '@alyle/ui/image-cropper';
import {LyCommonModule} from '@alyle/ui';
import {LyIconModule} from '@alyle/ui/icon';
import {LyButtonModule} from '@alyle/ui/button';


@NgModule({
  declarations: [
    ManageAccountComponent,
    ProfileDetailComponent,
    EditProfileAvatarComponent
  ],
  imports: [
    SharedModule,
    LySliderModule,
    LyImageCropperModule,
    LyCommonModule,
    LyIconModule,
    LyButtonModule,
  ]
})
export class UserProfileModule { }
