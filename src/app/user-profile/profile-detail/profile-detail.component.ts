import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from '../user-profile.service';
import {UserProfileModel} from '../user-profile-model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  profile: UserProfileModel;
  profileAvatar: any;
  userToken: string;

  constructor(private route: ActivatedRoute, private profileService: UserProfileService, private router: Router) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.getProfile(uid);
    this.userToken = localStorage.getItem('userToken');
  }

  // TODO: Look at adding an error message to 404 component to provide user more context
  getProfile(uid: string) {
    this.profileService.getUserProfileById(uid).subscribe(
      res => this.handleProfile(res),
      error => this.router.navigate(['not-found'])
    );
  }

  handleProfile(userProfile: UserProfileModel) {
    this.profile = userProfile;
    if (!userProfile.profileAvatar) {
      this.profileAvatar = '../../../assets/red-dragon-around-d20-transparent.png';
    } else {
      this.profileAvatar = userProfile.profileAvatar;
    }
  }



}
