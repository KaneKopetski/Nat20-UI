import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from '../user-profile.service';
import {UserProfileResponse} from '../user-profile-response';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  profile: UserProfileResponse;
  profileUrl: 'https://nat20profileavatars.s3.amazonaws.com/2020-09-15T23%3A52%3A22.948226_635292-icon-Cube1.png';
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
      res => this.profile = res,
      error => this.router.navigate(['not-found'])
    );
  }

}
