import {SkillModifierLineModel} from './skill-modifier-line-model';
import {SimpleSkillModel} from './simple-skill-model';

export interface SimpleSkillResponseModel {

  'skill': SimpleSkillModel;
  'skillModifierLine': SkillModifierLineModel;

}
