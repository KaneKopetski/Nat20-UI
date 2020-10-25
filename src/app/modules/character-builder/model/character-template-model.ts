import {CharacterTemplateBaseAbilityLineModel} from './character-template-base-ability-line-model';
import {CharacterTemplateSavingThrowLineModel} from './character-template-saving-throw-line-model';
import {BaseAbilityDescriptionModel} from './base-ability-description-model';
import {SavingThrowDescriptionModel} from './saving-throw-description-model';
import {SizeModel} from './size-model';
import {RaceModel} from './race-model';

export interface CharacterTemplateModel {
  'id': number;
  'basicAttributes': {
    'name': string;
    effectiveLevel: number;
    'height': {
      'feet': number;
      'inches': number;
  },
  'weight': number;
    'eyeColor': string;
    'hairColor': string;
    'skinColor': string
    'race': RaceModel,
  'size': SizeModel,
    'age': number;
    'deity': {
      'id': number;
      'name': string;
    },
    'gender': string;
    'quote': string;
    'description': string;
  };
  'baseAbilities': {
    'CONSTITUTION': CharacterTemplateBaseAbilityLineModel,
    'WISDOM': CharacterTemplateBaseAbilityLineModel,
    'CHARISMA': CharacterTemplateBaseAbilityLineModel,
    'DEXTERITY': CharacterTemplateBaseAbilityLineModel,
    'STRENGTH': CharacterTemplateBaseAbilityLineModel,
    'INTELLIGENCE': CharacterTemplateBaseAbilityLineModel,
  };
  'savingThrows': {
    'FORTITUDE': CharacterTemplateSavingThrowLineModel,
    'REFLEX': CharacterTemplateSavingThrowLineModel,
    'WILL': CharacterTemplateSavingThrowLineModel,
  };
  'combatAttributes': {
    'armorClass': number,
    'baseAttackBonus': number,
    'grappleModifier': number,
    'hitPoints': number
  };
  'creatorUid': string;
  'creatorDisplayName': string;
  'portraitUrl': string;
  'edition': string;
  'attributeDetails': {
    'baseAbilityDetails': {
      'charisma': BaseAbilityDescriptionModel;
      'dexterity': BaseAbilityDescriptionModel;
      'wisdom': BaseAbilityDescriptionModel;
      'intelligence': BaseAbilityDescriptionModel;
      'strength': BaseAbilityDescriptionModel;
      'constitution': BaseAbilityDescriptionModel;
    },
    'savingThrowDetails': {
      'reflex': SavingThrowDescriptionModel;
      'will': SavingThrowDescriptionModel;
      'fortitude': SavingThrowDescriptionModel;
    }
  };  'isFlipped'?: boolean;
}
