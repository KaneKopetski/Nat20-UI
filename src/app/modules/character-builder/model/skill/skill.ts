import {SkillSynergy} from "./skill-synergy-model";
import {DynamicTable} from "../dynamic-table/dynamic-table-model";

export interface Skill {

  id;
  name;
  skillInfo;
  keyAbility;
  armorCheckPenalty;
  trainedOnly;
  isHomebrew;
  synergisticSkills: Array<SkillSynergy>;
  skillTables: Map<string, DynamicTable>;

}
