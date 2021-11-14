import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-race-selection-form',
  templateUrl: './race-selection-form.component.html',
  styleUrls: ['./race-selection-form.component.css']
})
export class RaceSelectionFormComponent implements OnInit {

  @Input() characterBuilderForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
