import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  authService: AuthService;
  userData: any;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.authService.userData.subscribe(res => {
      this.userData = res;
    });
  }

}
