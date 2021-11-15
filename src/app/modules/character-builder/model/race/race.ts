import {Size} from '../size/size';
import {RaceBaseAbilityAdjustment} from "./race-base-ability-adjustment-model";
import {RaceSkillBonus} from "./race-skill-bonus-model";
import {Language} from "../language/language-model";

export interface Race {
  id: number;
  name: string;
  info: string;
  size: Size;
  baseLandSpeed: number;
  baseClimbSpeed: number;
  baseFlySpeed: number;
  flightManeuverability: string;
  levelAdjustment: number;
  automaticLanguages: Array<Language>;
  bonusLanguages: Array<Language>;
  favoredClass: string;
  adulthoodAge: number;
  middleAge: number;
  oldAge: number;
  venerableAge: number;
  maxAge: string;
  randomStartingAgeSimple: string;
  randomStartingAgeModerate: string;
  randomStartingAgeAdvanced: string;
  baseHeightMale: string;
  heightModifierMale: string;
  baseWeightMale: string;
  weightModifierMale: string;
  baseHeightFemale: string;
  heightModifierFemale: string;
  baseWeightFemale: string;
  weightModifierFemale: string;
  isHomebrew: boolean;
  abilityAdjustments: Array<RaceBaseAbilityAdjustment>;
  skillBonuses: Array<RaceSkillBonus>;
}
