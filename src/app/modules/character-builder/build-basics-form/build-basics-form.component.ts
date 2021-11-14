import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-build-basics-form',
  templateUrl: './build-basics-form.component.html',
  styleUrls: ['./build-basics-form.component.css']
})
export class BuildBasicsFormComponent implements OnInit {

  @Input() characterBuilderForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
