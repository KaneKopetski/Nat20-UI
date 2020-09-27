import { NgModule } from '@angular/core';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageAccountComponent,
    ProfileDetailComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserProfileModule { }
