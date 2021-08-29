import {Feat} from "./feat-model";
import {Skill} from "../skill/skill";
import {CharacterClass} from "../character-class/character-class";
import {FeatPrerequisiteRule} from "./feat-prerequisite-rule";
import {FeatPrerequisiteType} from "./feat-prerequisite-type";
import {BaseAbility} from "../base-ability/base-ability-model";
import {Race} from "../race/race";
import {LawChaosAlignment} from "../law-chaos-alignment-model";
import {GoodEvilAlignment} from "../good-evil-alignment-model";
import {Size} from "../size/size";
import {FeatType} from "./feat-type-model";

export interface FeatPrerequisite {
  prerequisiteAttributeValues: Map<FeatPrerequisiteType, number>;
  prerequisiteFeats: Map<FeatPrerequisiteRule, Array<Feat>>;
  prerequisiteSkills: Map<FeatPrerequisiteRule, Map<Skill, number>>;
  prerequisiteCharacterClasses: Map<FeatPrerequisiteRule, Map<CharacterClass, number>>;
  prerequisiteBaseAbilities: Map<FeatPrerequisiteRule, Map<BaseAbility, number>>;
  prerequisiteProficiencies: Array<string>;
  prerequisiteRaces: Array<Race>;
  prerequisiteLawChaosAlignment: LawChaosAlignment;
  prerequisiteGoodEvilAlignment: GoodEvilAlignment;
  prerequisiteSize: Size;
  prerequisiteFlavorText: Array<String>;
  prerequisiteFeatType: FeatType;
}
