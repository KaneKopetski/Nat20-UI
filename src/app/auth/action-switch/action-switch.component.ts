import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-action-switch',
  templateUrl: './action-switch.component.html',
  styleUrls: ['./action-switch.component.css']
})
export class ActionSwitchComponent implements OnInit {
  action: string;
  oobCode: string;
  apiKey: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.action = this.route.snapshot.queryParams['mode'];
    this.oobCode = this.route.snapshot.queryParams['oobCode'];
    this.apiKey = this.route.snapshot.queryParams['apiKey'];
  }

}
