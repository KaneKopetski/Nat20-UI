import { Component, Input } from '@angular/core';
import { CharacterTemplateModel } from '../model/character/character-template-model';
import { SkillResponseModel } from '../model/skill/skill-response-model';
import { SkillService } from '../skill.service';
import { CharacterTemplateBaseAbilityLineModel } from '../model/character/character-template-base-ability-line-model';
import { CharacterTemplateSavingThrowLineModel } from '../model/character/character-template-saving-throw-line-model';


@Component({
  selector: 'app-character-template',
  templateUrl: './character-template.component.html',
  styleUrls: ['./character-template.component.css']
})
export class CharacterTemplateComponent {

  @Input('character') character: CharacterTemplateModel;
  public toolTipDelayInMs = 750;

  public skillTest: SkillResponseModel;

  constructor(private skillService: SkillService) {
  }


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

  getSkill(id: number) {
    this.skillService.getSkillById(id).subscribe(res => this.skillTest = res);
  }

}
