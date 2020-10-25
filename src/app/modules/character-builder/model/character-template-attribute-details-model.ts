import {BaseAbilityDescriptionModel} from './base-ability-description-model';
import {SavingThrowDescriptionModel} from './saving-throw-description-model';

export interface CharacterTemplateAttributeDetailsModel {

    'strength': BaseAbilityDescriptionModel;
    'dexterity': BaseAbilityDescriptionModel;
    'constitution': BaseAbilityDescriptionModel;
    'wisdom': BaseAbilityDescriptionModel;
    'intelligence': BaseAbilityDescriptionModel;
    'charisma': BaseAbilityDescriptionModel;
    'fortitude': SavingThrowDescriptionModel;
    'reflex': SavingThrowDescriptionModel;
    'will': SavingThrowDescriptionModel;
}
