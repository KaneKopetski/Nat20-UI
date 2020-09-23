import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from '../user-profile.service';
import {UserProfileResponse} from '../user-profile-response';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  profile: UserProfileResponse;
  profileAvatar: SafeResourceUrl;
  userToken: string;

  constructor(private route: ActivatedRoute, private profileService: UserProfileService, private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.getProfile(uid);
    this.userToken = sessionStorage.getItem('userToken');
  }

  // TODO: Look at adding an error message to 404 component to provide user more context
  getProfile(uid: string) {
    this.profileService.getUserProfileById(uid).subscribe(
      res => this.profile = res,
      error => this.router.navigate(['not-found'])
    );
  }

  getImagePath() {
    if (this.profile.profileAvatar) {
      return this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.profile.profileAvatar.data);
    } else {
      return '../../../assets/red-dragon-around-d20-transparent.png';
    }
  }

}
