import {Race} from "../race/race";
import {Deity} from "../deity/deity-model";
import {LevelClassPair} from "../level-class-pair/level-class-pair-model";
import {BaseAbilityDetail} from "../base-ability/base-ability-detail-model";
import {SimpleFeatResponseModel} from "../feat/simple-feat-response-model";

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
  feats: Array<SimpleFeatResponseModel>;
  List<SkillRankPairResponse> skillRanks;
  UserProfileResponse createdBy;
}
