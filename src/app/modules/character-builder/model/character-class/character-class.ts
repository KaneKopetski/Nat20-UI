import {SkillResponseModel} from '../skill/skill-response-model';
import {ClassFeature} from '../class-feature/class-feature-model';
import {CharacterClassPrerequisite} from '../character-class-prerequisite/character-class-prerequisite-model';

export interface CharacterClass {
   id: number;
   name: string;
   isHomebrew: boolean;
   classTypes: Array<string>;
   hitDie: string;
   skillPoints: number;
   baseAttackBonusProgression: number;
   fortSaveProgression: string;
   reflexSaveProgression: string;
   willSaveProgression: string;
   classFeatures: Array<ClassFeature>;
   prerequisites: Array<CharacterClassPrerequisite>;
   classSkills: Array<SkillResponseModel>;
}
