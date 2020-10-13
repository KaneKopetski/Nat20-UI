import { Component, Input } from '@angular/core';
import { CharacterTemplateModel } from '../model/character-template-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-template',
  templateUrl: './character-template.component.html',
  styleUrls: ['./character-template.component.css']
})
export class CharacterTemplateComponent {

  @Input('character') character: CharacterTemplateModel;
  position = new FormControl('above');

}
