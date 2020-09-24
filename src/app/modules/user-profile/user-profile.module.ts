import { NgModule } from '@angular/core';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { DragNDropDirective } from '../../shared/directives/drag-ndrop.directive';


@NgModule({
  declarations: [
    EditUserProfileComponent,
    ProfileDetailComponent,
    DragNDropDirective
  ],
  imports: [
    SharedModule
  ]
})
export class UserProfileModule { }
