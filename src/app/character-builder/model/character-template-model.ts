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
    'race': {
      'id': number;
      'name': string;
      'size': {
        'readable': string;
        'attackAndACModifier': number;
        'specialAttacksModifier': number;
        'hideModifier': number;
        'heightOrLength': string;
        'weightRange': string;
        'space': number;
        'naturalReachLong': number;
        'naturalReachTall': number;
        'carryingCapacityModifierBiped': number
        'carryingCapacityModifierQuadruped': number;
      },
      'baseSpeed': number;
      'levelAdjustment': number;
      'baseAbilityRacialModifiers': {
        'DEXTERITY': {
          'modifierValue': number;
        },
        'STRENGTH': {
          'modifierValue': number;
        }
        'CONSTITUTION': {
          'modifierValue': number;
        }
        'INTELLIGENCE': {
          'modifierValue': number;
        }
        'WISDOM': {
          'modifierValue': number;
        }
        'CHARISMA': {
          'modifierValue': number;
        }
      }
    },
  'size': {
    'readable': string;
      'attackAndACModifier': number;
      'specialAttacksModifier': number;
      'hideModifier': number;
      'heightOrLength': string;
      'weightRange': string;
      'space': number;
      'naturalReachLong': number;
      'naturalReachTall': number;
      'carryingCapacityModifierBiped': number;
      'carryingCapacityModifierQuadruped': number;
  },
    'age': number;
    'deity': {
      'id': number;
      'name': string;
    },
    'gender': string;
  };
  'baseAbilities': {
    'CONSTITUTION': {
      'id': number;
      'inherentScore': number;
      'enhancementModifier': number;
      'temporaryModifier': number;
      'miscModifier': number;
    },
    'WISDOM': {
      'id': number;
      'inherentScore': number;
      'enhancementModifier': number;
      'temporaryModifier': number;
      'miscModifier': number;
    },
    'CHARISMA': {
      'id': number;
      'inherentScore': number;
      'enhancementModifier': number;
      'temporaryModifier': number;
      'miscModifier': number;
    },
    'DEXTERITY': {
      'id': number;
      'inherentScore': number;
      'enhancementModifier': number;
      'temporaryModifier': number;
      'miscModifier': number;
    },
    'STRENGTH': {
      'id': number;
      'inherentScore': number;
      'enhancementModifier': number;
      'temporaryModifier': number;
      'miscModifier': number;
    },
    'INTELLIGENCE': {
      'id': number;
      'inherentScore': number;
      'enhancementModifier': number;
      'temporaryModifier': number;
      'miscModifier': number;
    }
  };
  'creator': {
    'uid': string;
    'displayName': string;
    'email': string;
  };
  isFlipped?: boolean;
}
