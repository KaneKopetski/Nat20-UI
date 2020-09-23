import { NgModule } from '@angular/core';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    EditUserProfileComponent,
    ProfileDetailComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserProfileModule { }
