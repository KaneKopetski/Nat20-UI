import {FeatModifierType} from "./feat-modifier-type";

export interface FeatModifier {
  featModifierType: FeatModifierType;
  modifierId: string;
  modifierValue: string;
}
