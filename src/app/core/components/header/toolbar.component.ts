import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppButton } from './app-button-model';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../modules/authentication/auth.service';
import { UserProfileResponse } from '../../../modules/user-profile/user-profile-response';
import { UserProfileService } from '../../../modules/user-profile/user-profile.service';
import { User } from 'firebase';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  @Input() deviceXs: boolean;
  @Input() deviceSm: boolean;
  @Input() deviceMd: boolean;
  @Input() deviceLg: boolean;
  @Input() sideNav: MatDrawer;
  userData: User;
  userProfile: UserProfileResponse;
  apps: AppButton[];
  userProfileService: UserProfileService;

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private authService: AuthService,
              userProfileService: UserProfileService) {
    this.userProfileService = userProfileService;
  }

  ngOnInit(): void {
    // TODO: get list of apps from service or elsewhere
    this.apps = [
      {name: 'Character Builder', iconUrl: 'assets/medieval.svg', iconClass: 'characterLight', iconName: 'medieval', route: ''},
      {name: 'Homebrewer\'s Lab', iconUrl: 'assets/alchemy.svg', iconClass: 'alchemyLight', iconName: 'alchemy', route: ''},
      {name: 'The Smithy', iconUrl: 'assets/hammer.svg', iconClass: 'anvilLight', iconName: 'hammer', route: ''}
    ];

    this.apps.forEach(app => {
      this.matIconRegistry.addSvgIcon(app.iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(app.iconUrl));
    });

    this.authService.userData.subscribe(result => this.userData = result);
  }

  signOut() {
    this.authService.signOutAndRedirect();
  }
}
