import { Component, Input } from '@angular/core';
import { CharacterTemplateModel } from '../model/character-template-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-template-list',
  templateUrl: './character-template-list.component.html',
  styleUrls: ['./character-template-list.component.css']
})
export class CharacterTemplateListComponent  {

  @Input('characterList') characters: Array<CharacterTemplateModel>;
  position = new FormControl('above');

  // applyRacialModifiersToBaseAbilityScore(): Array<CharacterTemplateModel> {
  //   this.characters.every(character => {
  //     switch (true) {
  //       case !!character.basicAttributes.race.raceBaseAbilityModifiers.STRENGTH: {
  //         character.baseAbilities.STRENGTH.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.STRENGTH;
  //         break;
  //       }
  //       case !!character.basicAttributes.race.raceBaseAbilityModifiers.DEXTERITY: {
  //         character.baseAbilities.DEXTERITY.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.DEXTERITY;
  //         break;
  //       }
  //       case !!character.basicAttributes.race.raceBaseAbilityModifiers.CONSTITUTION: {
  //         character.baseAbilities.CONSTITUTION.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.CONSTITUTION;
  //         break;
  //       }
  //       case !!character.basicAttributes.race.raceBaseAbilityModifiers.WISDOM: {
  //         character.baseAbilities.WISDOM.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.WISDOM;
  //         break;
  //       }
  //       case !!character.basicAttributes.race.raceBaseAbilityModifiers.INTELLIGENCE: {
  //         character.baseAbilities.INTELLIGENCE.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.INTELLIGENCE;
  //         break;
  //       }
  //       case !!character.basicAttributes.race.raceBaseAbilityModifiers.CHARISMA: {
  //         character.baseAbilities.CHARISMA.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.CHARISMA;
  //         break;
  //       }
  //       default: {
  //         return characters;
  //       }
  //     }
  //     return characters;
  //   });
  //   return characters;
  // }

}
