import {SkillModifierLineModel} from './skill-modifier-line-model';
import {SkillModel} from './skill-model';

export interface SkillResponseModel {

  'skill': SkillModel;
  'skillModifierLine': SkillModifierLineModel;

}
