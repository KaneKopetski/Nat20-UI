import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CharacterBuilderFormService} from "../services/characer-builder-form-service/character-builder-form.service";

@Component({
  selector: 'app-build-basics-form',
  templateUrl: './build-basics-form.component.html',
  styleUrls: ['./build-basics-form.component.css']
})
export class BuildBasicsFormComponent implements OnInit {

  constructor(public cbFormService: CharacterBuilderFormService) { }

  ngOnInit(): void {
  }

}
