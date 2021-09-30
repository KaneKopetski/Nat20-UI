import {Skill} from "../skill/skill";
import {CharacterClassPrerequisite} from "./character-class-prerequisite-model";
import {ClassFeature} from "./class-feature-model";
import {Source} from "../source/source-model";

export interface CharacterClass {
   id: number;
   name: string;
   description?: string;
   isHomebrew?: boolean;
   classTypes?: Array<string>;
   hitDie?: string;
   skillPoints?: number;
   baseAttackBonusProgression?: number;
   fortSaveProgression?: string;
   reflexSaveProgression?: string;
   willSaveProgression?: string;
   classFeatures?: Array<ClassFeature>;
   prerequisites?: Array<CharacterClassPrerequisite>;
   classSkills?: Array<Skill>;
   source: Source;
}
