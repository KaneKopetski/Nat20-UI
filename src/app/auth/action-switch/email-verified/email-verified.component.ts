import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.css']
})
export class EmailVerifiedComponent implements OnInit {
  private oobCode: string;

  constructor(private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.oobCode = this.route.snapshot.queryParams.oobCode;
    this.authService.setEmailVerified(this.oobCode);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }

}
