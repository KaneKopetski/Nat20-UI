import {Race} from "../race/race";
import {LevelClassPair} from "../level-class-pair/level-class-pair-model";
import {BaseAbilityDetail} from "../base-ability/base-ability-detail-model";
import {UserProfile} from "../../../user-profile/user-profile";
import {SkillRankPair} from "../skill/skill-rank-pair-model";
import {Feat} from "../feat/feat-model";
import {Deity} from "../deity/deity-model";

export interface CharacterBuild {
  id: number;
  name: string;
  description: string;
  race: Race;
  deity: Deity;
  classes: Array<LevelClassPair>;
  languages: string;
  visibility: string;
  baseAbilityScores: Array<BaseAbilityDetail>;
  feats: Array<Feat>;
  skillRanks: Array<SkillRankPair>;
  createdBy: UserProfile;
}
