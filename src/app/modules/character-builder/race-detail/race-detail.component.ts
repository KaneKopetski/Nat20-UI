import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Race} from "../model/race/race";

@Component({
  selector: 'app-race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.css']
})
export class RaceDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public race: Race) { }

  ngOnInit(): void {}


}
