import { BaseAbilityModel } from '../base-ability/base-ability-model';
import { SimpleSkillModel } from './simple-skill-model';
import { SkillDcResponseModel } from './skill-dc-response-model';
import { SkillCircumstanceModifierResponseModel } from './skill-circumstance-modifier-response-model';
import { OpposedSkillResponseModel } from './opposed-skill-response-model';

export interface SkillResponseModel {

  id: number;
  name: string;
  checkInstructions: string;
  actionInfo: string;
  specialInfo: string;
  tryAgainInfo: string;
  miscInfo: string;
  trainedOnly: boolean;
  dcMapNotes: string;
  circumstanceModifierMapNotes: string;
  opposedCheckMapNotes: string;
  keyAbility: BaseAbilityModel;
  synergisticSkills: [SimpleSkillModel];
  skillDCMap: [SkillDcResponseModel];
  skillCircumstanceModifiers: [SkillCircumstanceModifierResponseModel];
  skillOpposedChecks: [OpposedSkillResponseModel];

}
