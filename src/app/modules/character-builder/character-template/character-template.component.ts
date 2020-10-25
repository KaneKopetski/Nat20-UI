import { Component, Input } from '@angular/core';
import { CharacterTemplateModel } from '../model/character-template-model';
import {CharacterTemplateSavingThrowLineModel} from '../model/character-template-saving-throw-line-model';
import {CharacterTemplateBaseAbilityLineModel} from '../model/character-template-base-ability-line-model';
import {mod} from 'ngx-bootstrap/chronos/utils';

@Component({
  selector: 'app-character-template',
  templateUrl: './character-template.component.html',
  styleUrls: ['./character-template.component.css']
})
export class CharacterTemplateComponent {

  @Input('character') character: CharacterTemplateModel;
  public toolTipDelayInMs = 750;

  calculateBaseAbilityTotal(abilityLine: CharacterTemplateBaseAbilityLineModel): number {
    return abilityLine.inherentScore +
      abilityLine.enhancementModifier +
      abilityLine.miscModifier +
      abilityLine.temporaryModifier;
  }

  calculateAbilityModifier(abilityScore: number) {
    return Math.floor((abilityScore - 10) / 2);
  }

  calculateSavingThrowTotal(savingThrowLine: CharacterTemplateSavingThrowLineModel): number {
    return savingThrowLine.baseSave +
      savingThrowLine.epicSaveBonus +
      savingThrowLine.magicModifier +
      savingThrowLine.miscModifier +
      savingThrowLine.temporaryModifier;
  }

  getRacialAbilityModifiers(): Array<string> {
    const modifiers = new Array<string>();

    this.character.basicAttributes.race.raceBaseAbilityModifiers.STRENGTH ?
      modifiers.push('Strength: ' + this.character.basicAttributes.race.raceBaseAbilityModifiers.STRENGTH) : modifiers.push('Strength: 0');
    this.character.basicAttributes.race.raceBaseAbilityModifiers.DEXTERITY ?
      modifiers.push('Dexterity: ' + this.character.basicAttributes.race.raceBaseAbilityModifiers.DEXTERITY) : modifiers.push('Dexterity: 0');
    this.character.basicAttributes.race.raceBaseAbilityModifiers.CONSTITUTION ?
      modifiers.push('Constitution: ' + this.character.basicAttributes.race.raceBaseAbilityModifiers.CONSTITUTION) : modifiers.push('Constitution: 0');
    this.character.basicAttributes.race.raceBaseAbilityModifiers.WISDOM ?
      modifiers.push('Wisdom: ' + this.character.basicAttributes.race.raceBaseAbilityModifiers.WISDOM) : modifiers.push('Wisdom: 0');
    this.character.basicAttributes.race.raceBaseAbilityModifiers.INTELLIGENCE ?
      modifiers.push('Intelligence: ' + this.character.basicAttributes.race.raceBaseAbilityModifiers.INTELLIGENCE) : modifiers.push('Intelligence: 0');
    this.character.basicAttributes.race.raceBaseAbilityModifiers.CHARISMA ?
      modifiers.push('Charisma: ' + this.character.basicAttributes.race.raceBaseAbilityModifiers.CHARISMA) : modifiers.push('Charisma: 0');

    return modifiers;

  }

}
