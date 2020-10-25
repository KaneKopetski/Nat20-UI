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

}
