import {Race} from "../race/race";
import {Feat} from "../feat/feat-model";
import {CharacterClassPrerequisiteRule} from "./character-class-prerequisite-rule";
import {ClassFeature} from "./class-feature-model";
import {NumberOfFeatsOfType} from "./number-of-feats-of-type-model";
import {CharacterClassPrerequisiteBaseAbilityScore} from "./character-class-prerequisite-base-ability-score-model";
import {CharacterClassPrerequisiteSkillRank} from "./character-class-prerequisite-skill-rank-model";

export interface CharacterClassPrerequisite {
  prerequisiteBaseAbilityScores: Map<CharacterClassPrerequisiteRule, Array<CharacterClassPrerequisiteBaseAbilityScore>>;
  prerequisiteSkillRanks: Map<CharacterClassPrerequisiteRule, Array<CharacterClassPrerequisiteSkillRank>>;
  prerequisiteKnowledgeOfSpecificLevelSpellsFromSpecificSpellSchool: Map<CharacterClassPrerequisiteRule, Map<String, String>>;
  prerequisiteRaces: Array<Race>;
  prerequisiteBaseFeats: Map<CharacterClassPrerequisiteRule, Array<Feat>>;
  prerequisiteClassFeatures: Map<CharacterClassPrerequisiteRule, Array<ClassFeature>>;
  prerequisiteAlignments: Map<CharacterClassPrerequisiteRule, Array<String>>;
  prerequisiteLanguages: Map<CharacterClassPrerequisiteRule, Array<String>>;
  prerequisiteProficiencies: Map<CharacterClassPrerequisiteRule, Array<String>>;
  prerequisiteBaseAttackBonus: number;
  specialPrerequisite: string;
  prerequisiteManifesterLevel: number;
  prerequisiteAbilityToManifestPowerOfLevel: number;
  prerequisiteDivineCasterLevel: number;
  prerequisiteArcaneArcaneLevel: number;
  prerequisiteTypeOfFeat: string;
  numberOfFeatsOfType: NumberOfFeatsOfType;
  prerequisiteNotCreatureType: Array<string>;
  prerequisiteClassTypes: Map<CharacterClassPrerequisiteRule, Array<String>>;
}
