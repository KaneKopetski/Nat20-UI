import { Component, Input } from '@angular/core';
import { CharacterTemplateModel } from '../model/character-template-model';

@Component({
  selector: 'app-character-template-list',
  templateUrl: './character-template-list.component.html',
  styleUrls: ['./character-template-list.component.css']
})
export class CharacterTemplateListComponent  {

  @Input('characterList') characters: Array<CharacterTemplateModel>;
  @Input('rowHeader') rowText: string;

}
