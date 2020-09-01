import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserProfileService} from '../user-profile.service';
import {UserProfileModel} from '../user-profile-model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  profile: UserProfileModel;

  constructor(private route: ActivatedRoute, private profileService: UserProfileService) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.getProfile(uid);
  }

  getProfile(uid: string) {
    this.profileService.getUserProfileById(uid).subscribe(
      res => this.profile = res,
      error => console.log(error)
      );
  }

}
