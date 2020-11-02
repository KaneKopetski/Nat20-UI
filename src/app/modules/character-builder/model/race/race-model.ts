import {SizeModel} from '../size/size-model';

export interface RaceModel {
  'id': number;
  'name': string;
  'size': SizeModel;
  'baseSpeed': number;
  'levelAdjustment': number;
  'raceBaseAbilityModifiers': {
    'STRENGTH'?: number;
    'CONSTITUTION'?: number;
    'DEXTERITY'?: number;
    'WISDOM'?: number;
    'INTELLIGENCE'?: number;
    'CHARISMA'?: number;
  };
}
