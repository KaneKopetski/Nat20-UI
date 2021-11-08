import {FormControl} from "@angular/forms";
import {BaseAbilityScore} from "../../modules/character-builder/model/base-ability/base-ability-score.model";

export abstract class Constants {
  public static readonly VALID_EMAIL_MESSAGE: string = 'Email is valid';

  public static readonly PASSWORD_MIN_LENGTH_MESSAGE: string = 'Has at least 8 characters';
  public static readonly PASSWORD_HAS_CAPS_MESSAGE: string = 'Has at least one capital letter';
  public static readonly PASSWORD_HAS_LOWER_CASE_MESSAGE: string = 'Has at least one lowercase letter';
  public static readonly PASSWORD_HAS_NUMBER_MESSAGE: string = 'Has at least one number';
  public static readonly PASSWORD_HAS_SPECIAL_CHARACTER_MESSAGE: string = 'Has at least one special character';

  public static readonly PASSWORD_CONFIRMATION_MESSAGE: string = 'Passwords match';

  public static readonly FIELD_REQUIRED_MESSAGE: string = 'Field is required';

  public static readonly EMAIL_INVALID_MESSAGE: string = 'Email is in invalid format';
  public static readonly USER_NOT_FOUND_MESSAGE: string = 'Account not found';
  public static readonly USER_DISABLED_MESSAGE: string = 'This account is disabled';
  public static readonly WRONG_PASSWORD_MESSAGE: string = 'Invalid password';
  public static readonly UNKNOWN_ERROR_MESSAGE: string = 'Unknown error. Please try again later';
  public static readonly MUST_BE_LOGGED_IN: string = 'You must be logged in';

  public static readonly GENERIC_ERROR_TITLE: string = 'Here be dragons!';

  public static readonly FORTITUDE_SAVE_PROGRESS_STRING: string = 'fortSaveProgression';
  public static readonly REFLEX_SAVE_PROGRESS_STRING: string = 'reflexSaveProgression';
  public static readonly WILL_SAVE_PROGRESS_STRING: string = 'willSaveProgression';

  public static readonly CONSTITUTION_SCORE_LABEL: string = 'constitutionScore'
  public static readonly DEXTERITY_SCORE_LABEL: string = 'dexterityScore'
  public static readonly WISDOM_SCORE_LABEL: string = 'wisdomScore'

  public static readonly SAVING_THROW_QUALITY_GOOD = 'GOOD';
  public static readonly GOOD_SAVING_THROW_FORMULA = '2 + (class levels / 2)';
  public static readonly BAD_SAVING_THROW_FORMULA = 'class levels / 3';

  public static readonly COMMA_SPACE: string = ', ';

  public static readonly USER_KEY: string = 'user';
  public static readonly USER_TOKEN_KEY: string = 'userToken';

  public static readonly MANUAL: string = 'manual';
  public static readonly SOURCES_SELECTED: string = 'sourcesSelected';
  public static readonly ZERO: string = '0';
  public static readonly DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE: string = '8';
  public static readonly DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE: string = '--';
  public static readonly CHARACTER_BUILDER_RESOURCE_ERROR_MSG: string = 'Error while trying to load resources for character builder. Please try again later. '
  public static readonly RESOURCE_NOT_FOUND_MSG: string = 'Resource not found.';
  public static readonly ERROR_TITLE_MSG: string = 'There be dragons?';
  public static readonly GENERIC_ERROR_MSG: string = 'Something went wrong. Please try again.';
  public static readonly STANDARD_ARRAY_SUFFIX: string = 'ScoreStandardArray';

  public static readonly tooltipDelay = new FormControl(750);

  public static readonly specialSourceCases = {
    coreOnly: 'Core Only',
    srdOnly: 'SRD Only',
    selectAll: 'Select all',
    selectNone: 'Select none',
  };

  public static readonly userProfileUrls = {
    basePath: '/userProfile',
    getById: '/getById/',
    getOrCreate: '/getOrCreate',
    saveProfile: '/save',
    update: '/update',
    manage: '/manage'
  };

  public static readonly babDisplayValues = new Map<number, string>([
    [1, 'Full'],
    [.75, 'Three-Quarters'],
    [.5, 'Half']
  ]);

  public static readonly emptyClassFeatureByLevelMap: Map<number, string> = new Map<number, string>([
    [1, ''],
    [2, ''],
    [3, ''],
    [4, ''],
    [5, ''],
    [6, ''],
    [7, ''],
    [8, ''],
    [9, ''],
    [10, ''],
    [11, ''],
    [12, ''],
    [13, ''],
    [14, ''],
    [15, ''],
    [16, ''],
    [16, ''],
    [17, ''],
    [18, ''],
    [19, ''],
    [20, ''],
  ])

  public static readonly savingThrows: string[] = ['fortSaveProgression', 'reflexSaveProgression', 'willSaveProgression'];

  public static readonly classLevelManagerSearchTableColumnsToDisplay: string[] = [
    'name',
    'hit-die',
    'base-attack-bonus-progression',
    'fort-save-progression',
    'reflex-save-progression',
    'will-save-progression',
    'source',
    'actions'
  ];

  public static classLevelManagerSearchTableColumnsMapping(): Map<string, string> {
    let map: Map<string, string> = new Map();

    map.set('name', 'name');
    map.set('hit-die', 'hitDie');
    map.set('base-attack-bonus-progression', 'baseAttackBonusProgression');
    map.set('fort-save-progression', 'fortSaveProgression');
    map.set('reflex-save-progression', 'reflexSaveProgression');
    map.set('will-save-progression', 'willSaveProgression');

    return map;
  }

  public static readonly classLevelManagerClassLevelTableColumnsToDisplay: string[] = [
    'drag',
    'level',
    'character-class',
    'bab-total',
    'fort-save-total',
    'reflex-save-total',
    'will-save-total',
    'class-features',
    'actions'
  ];

  public static readonly baseAbilityScoreData: BaseAbilityScore[] = [
    {position: 1, ability: 'Str', score: 0},
    {position: 2, ability: 'Dex', score: 0},
    {position: 3, ability: 'Con', score: 0},
    {position: 4, ability: 'Wis', score: 0},
    {position: 5, ability: 'Int', score: 0},
    {position: 6, ability: 'Cha', score: 0},
  ];

  public static readonly baseAbilities: Array<string> = ['strength', 'dexterity', 'constitution', 'wisdom', 'intelligence', 'charisma'];

  public static readonly characterClassLevelsDisplayHeaders: string[] = ['level', 'class', 'remove'];

  public static readonly abilityScoreInputColumns = ['ability', 'score'];

  public static readonly defaultErrorResponse = {
    timestamp: '',
    status: 500,
    message: 'Something went wrong. Please try again later.'
  };

  public static readonly standardArrayOptions = [
    {value: 15, isAllowed: true},
    {value: 14, isAllowed: true},
    {value: 13, isAllowed: true},
    {value: 12, isAllowed: true},
    {value: 10, isAllowed: true},
    {value: 8, isAllowed: true}]

  public static readonly coreOnlySources = ['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35'];
  public static readonly srdOnlySources = ['MONSTER_MANUAL', 'PLAYERS_HANDBOOK_V35', 'DUNGEON_MASTERS_GUIDE_V35', 'EXPANDED_PSIONICS_HANDBOOK'];

}
