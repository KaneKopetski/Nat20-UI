import {FormControl} from "@angular/forms";

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

  public static readonly GENERIC_ERROR_MESSAGE: string = 'Here be dragons!';

  public static readonly FORTITUDE_SAVE_PROGRESS_STRING: string = 'fortSaveProgression';
  public static readonly REFLEX_SAVE_PROGRESS_STRING: string = 'reflexSaveProgression';
  public static readonly WILL_SAVE_PROGRESS_STRING: string = 'willSaveProgression';

  public static readonly SAVING_THROW_QUALITY_GOOD = 'GOOD';
  public static readonly GOOD_SAVING_THROW_FORMULA = '2 + (class levels / 2)';
  public static readonly BAD_SAVING_THROW_FORMULA = 'class levels / 3';

  public static readonly COMMA_SPACE: string = ', ';

  public static readonly USER_KEY: string = 'user';
  public static readonly USER_TOKEN_KEY: string = 'userToken';

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

  public static savingThrowAbilityMap(): Map<string, string> {
    return new Map([
      ['fortSaveProgression', 'constitutionScore'],
      ['reflexSaveProgression', 'dexterityScore'],
      ['willSaveProgression', 'wisdomScore']
    ]);
  }

  public static readonly savingThrows: string[] = ['fortSaveProgression', 'reflexSaveProgression', 'willSaveProgression'];

  public static readonly classLevelManagerSearchTableColumnsToDisplay: string[] = [
    'name',
    'hit-die',
    'base-attack-bonus-progression',
    'fort-save-progression',
    'reflex-save-progression',
    'will-save-progression',
    'actions'
  ];

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


  public static readonly allSources = [{
    "sourceEnum": "ARMS_AND_EQUIPMENT_GUIDE",
    "readable": "Arms and Equipment Guide"
  }, {
    "sourceEnum": "BOOK_OF_CHALLENGES_DUNGEON_ROOMS_PUZZLES_AND_TRAPS",
    "readable": "Book of Challenges: Dungeons, Rooms, Puzzles, and Traps"
  }, {
    "sourceEnum": "BOOK_OF_EXALTED_DEEDS",
    "readable": "Book of Exalted Deeds"
  }, {"sourceEnum": "BOOK_OF_VILE_DARKNESS", "readable": "Book of Vile Darkness"}, {
    "sourceEnum": "CHAMPIONS_OF_RUIN",
    "readable": "Champions of Ruin"
  }, {
    "sourceEnum": "CHAMPIONS_OF_VALOR",
    "readable": "Champions of Valor"
  }, {
    "sourceEnum": "CITY_OF_SPLENDORS_WATERDEEP",
    "readable": "City of Splendors: Waterdeep"
  }, {"sourceEnum": "CITYSCAPE", "readable": "Cityscape"}, {
    "sourceEnum": "COMPLETE_ADVENTURER",
    "readable": "Complete Adventurer"
  }, {"sourceEnum": "COMPLETE_ARCANE", "readable": "Complete Arcane"}, {
    "sourceEnum": "COMPLETE_CHAMPION",
    "readable": "Complete Champion"
  }, {"sourceEnum": "COMPLETE_DIVINE", "readable": "Complete Divine"}, {
    "sourceEnum": "COMPLETE_MAGE",
    "readable": "Complete Mage"
  }, {"sourceEnum": "COMPLETE_PSIONIC", "readable": "Complete Psionic"}, {
    "sourceEnum": "COMPLETE_SCOUNDREL",
    "readable": "Complete Scoundrel"
  }, {
    "sourceEnum": "COMPLETE_WARRIOR",
    "readable": "Complete Warrior"
  }, {
    "sourceEnum": "DEFENDERS_OF_THE_FAITH_A_GUIDEBOOK_TO_CLERICS_AND_PALADINS",
    "readable": "Defenders of the Faith: A Guidebook to Clerics and Paladins"
  }, {"sourceEnum": "DEITIES_AND_DEMIGODS", "readable": "Deities and Demigods"}, {
    "sourceEnum": "DRACONOMICON",
    "readable": "Draconomicon"
  }, {"sourceEnum": "DRAGON_COMPENDIUM", "readable": "Dragon Compendium"}, {
    "sourceEnum": "DRAGON_MAGIC",
    "readable": "Dragon Magic"
  }, {
    "sourceEnum": "DRAGONLANCE_CAMPAIGN_SETTING",
    "readable": "Dragonlance Campaign Setting"
  }, {"sourceEnum": "DRAGONMARKED", "readable": "Dragonmarked"}, {
    "sourceEnum": "DRAGONS_OF_EBBERON",
    "readable": "Dragons of Ebberon"
  }, {"sourceEnum": "DRAGONS_OF_FAERUN", "readable": "Dragons of Faerun"}, {
    "sourceEnum": "DROW_OF_THE_UNDERDARK",
    "readable": "Drow of the Underdark"
  }, {
    "sourceEnum": "DUNGEON_MASTERS_GUIDE_II",
    "readable": "Dungeon Masters Guide II"
  }, {
    "sourceEnum": "DUNGEON_MASTERS_GUIDE_V35",
    "readable": "Dungeon Masters Guide v3.5"
  }, {"sourceEnum": "DUNGEONSCAPE", "readable": "Dungeonscape"}, {
    "sourceEnum": "EBERRON_CAMPAIGN_SETTING",
    "readable": "Eberron Campign Setting"
  }, {"sourceEnum": "ELDER_EVILS", "readable": "Elder Evils"}, {
    "sourceEnum": "ENEMIES_AND_ALLIES",
    "readable": "Enemies and Allies"
  }, {"sourceEnum": "EPIC_LEVEL_HANDBOOK", "readable": "Epic Level Handbook"}, {
    "sourceEnum": "EXEMPLARS_OF_EVIL",
    "readable": "Exemplars of Evil"
  }, {
    "sourceEnum": "EXPANDED_PSIONICS_HANDBOOK",
    "readable": "Expanded Psionics Handbook"
  }, {
    "sourceEnum": "EXPEDITION_TO_CASTLE_RAVENLOFT",
    "readable": "Expedition to Castle Ravenloft"
  }, {
    "sourceEnum": "EXPEDITION_TO_THE_DEMONWEB_PITS",
    "readable": "Expedition to the Demonweb Pits"
  }, {"sourceEnum": "EXPLORERS_HANDBOOK", "readable": "Explorers Handbook"}, {
    "sourceEnum": "EYES_OF_THE_LICH_QUEEN",
    "readable": "Eyes of the Lich Queen"
  }, {"sourceEnum": "FAITHS_PANTHEONS", "readable": "Faith's Pantheon"}, {
    "sourceEnum": "FAITHS_OF_EBERRON",
    "readable": "Faiths of Eberron"
  }, {"sourceEnum": "FEATS", "readable": "Feats"}, {
    "sourceEnum": "FIEND_FOLIO",
    "readable": "Fiend Folio"
  }, {
    "sourceEnum": "FIENDISH_CODEX_I_HORDES_OF_THE_ABYSS",
    "readable": "Fiendish Codex I: Hordes of the Abyss"
  }, {
    "sourceEnum": "FIENDISH_CODEX_II_TYRANTS_OF_THE_NINE_HELLS",
    "readable": "Fiendish Codex II: Tyrants of the Nine Hells"
  }, {"sourceEnum": "FIVE_NATIONS", "readable": "Five Nations"}, {
    "sourceEnum": "FORGOTTEN_REALMS_CAMPAIGN_SETTING",
    "readable": "Forgotten Realms Campaign Setting"
  }, {"sourceEnum": "FROSTBURN", "readable": "Frostburn"}, {
    "sourceEnum": "GHOSTWALK",
    "readable": "Ghostwalk"
  }, {"sourceEnum": "HEROES_OF_BATTLE", "readable": "Heroes of Battle"}, {
    "sourceEnum": "HEROES_OF_HORROR",
    "readable": "Heroes of Horror"
  }, {
    "sourceEnum": "LIBRIS_MORTIS_THE_BOOK_OF_THE_DEAD",
    "readable": "Libris Mortis: The Book of the Dead"
  }, {"sourceEnum": "LORDS_OF_DARKNESS", "readable": "Lords of Darkness"}, {
    "sourceEnum": "LORDS_OF_MADNESS",
    "readable": "Lords of Madness"
  }, {
    "sourceEnum": "LOST_EMPIRES_OF_FAERUN",
    "readable": "Lost Empires of Faerun"
  }, {"sourceEnum": "MAGIC_ITEM_COMPENDIUM", "readable": "Magic Item Compendium"}, {
    "sourceEnum": "MAGIC_OF_EBERRON",
    "readable": "Magic of Eberron"
  }, {"sourceEnum": "MAGIC_OF_FAERUN", "readable": "Magic of Faerun"}, {
    "sourceEnum": "MAGIC_OF_INCARNUM",
    "readable": "Magic of Incarnum"
  }, {
    "sourceEnum": "MANUAL_OF_THE_PLANES",
    "readable": "Manual of the Planes"
  }, {
    "sourceEnum": "MASTERS_OF_THE_WILD_A_GUIDEBOOK_TO_BARBARIANS_DRUIDS_AND_RANGERS",
    "readable": "Masters of the Wild: A Guidebook to Barbarians, Druids, and Rangers"
  }, {
    "sourceEnum": "MINIATURES_HANDBOOK",
    "readable": "Miniatures Handbook"
  }, {
    "sourceEnum": "MONSTER_COMPENDIUM_MONSTERS_OF_FAERUN",
    "readable": "Monster Compendium: Monsters of Faerun"
  }, {"sourceEnum": "MONSTER_MANUAL", "readable": "Monster Manual"}, {
    "sourceEnum": "MONSTER_MANUAL_II",
    "readable": "Monster Manual II"
  }, {"sourceEnum": "MONSTER_MANUAL_III", "readable": "Monster Manual III"}, {
    "sourceEnum": "MONSTER_MANUAL_IV",
    "readable": "Monster Manual IV"
  }, {"sourceEnum": "MONSTER_MANUAL_V", "readable": "Monster Manual V"}, {
    "sourceEnum": "MONSTER_MANUAL_V35",
    "readable": "Monster Manual v3.5"
  }, {"sourceEnum": "ORIENTAL_ADVENTURES", "readable": "Oriental Adventures"}, {
    "sourceEnum": "PLANAR_HANDBOOK",
    "readable": "Planar Handbook"
  }, {
    "sourceEnum": "PLAYERS_GUIDE_TO_EBERRON",
    "readable": "Players Guide to Eberron"
  }, {
    "sourceEnum": "PLAYERS_GUIDE_TO_FAERUN",
    "readable": "Players Guide to Faerun"
  }, {"sourceEnum": "PLAYERS_HANDBOOK_30", "readable": "Player's Handbook 3.0"}, {
    "sourceEnum": "PLAYERS_HANDBOOK_II",
    "readable": "Player's Handbook II"
  }, {"sourceEnum": "PLAYERS_HANDBOOK_V35", "readable": "Player's Handbook v3.5"}, {
    "sourceEnum": "POWER_OF_FAERUN",
    "readable": "Power of Faerun"
  }, {"sourceEnum": "PSIONICS_HANDBOOK_30", "readable": "Psionics Handbook 3.0"}, {
    "sourceEnum": "RACES_OF_DESTINY",
    "readable": "Races of Destiny"
  }, {"sourceEnum": "RACES_OF_EBERRON", "readable": "Races of Eberron"}, {
    "sourceEnum": "RACES_OF_FAERUN",
    "readable": "Races of Faerun"
  }, {"sourceEnum": "RACES_OF_STONE", "readable": "Races of Stone"}, {
    "sourceEnum": "RACES_OF_THE_DRAGON",
    "readable": "Races of the Dragon"
  }, {"sourceEnum": "RACES_OF_THE_WILD", "readable": "Races of the Wild"}, {
    "sourceEnum": "RED_HAND_OF_DOOM",
    "readable": "Red Hand of Doom"
  }, {
    "sourceEnum": "RETURN_TO_THE_TEMPLE_OF_ELEMENTAL_EVIL",
    "readable": "Return to the Template of Elemental Evil"
  }, {"sourceEnum": "SANDSTORM", "readable": "Sandstorm"}, {
    "sourceEnum": "SAVAGE_SPECIES",
    "readable": "Savage Species"
  }, {"sourceEnum": "SECRETS_OF_SARLONA", "readable": "Secrets of Sarlona"}, {
    "sourceEnum": "SECRETS_OF_XENDRIK",
    "readable": "Secrets of Xendrik"
  }, {
    "sourceEnum": "SERPENT_KINGDOMS",
    "readable": "Serpent Kingdoms"
  }, {
    "sourceEnum": "SHADOWDALE_THE_SCOURING_OF_THE_LAND",
    "readable": "Shadowdale: The Scouring of the Land"
  }, {"sourceEnum": "SHARN_CITY_OF_TOWERS", "readable": "Sharn City of Towers"}, {
    "sourceEnum": "SHINING_SOUTH",
    "readable": "Shining South"
  }, {
    "sourceEnum": "SILVER_MARCHES",
    "readable": "Silver Marches"
  }, {
    "sourceEnum": "SONG_AND_SILENCE_A_GUIDEBOOK_TO_BARDS_AND_ROGUES",
    "readable": "Song and Silence: A Guidebook to Bards and Rogues"
  }, {"sourceEnum": "SPELL_COMPENDIUM", "readable": "Spell Compendium"}, {
    "sourceEnum": "STORMWRACK",
    "readable": "Stormwrack"
  }, {
    "sourceEnum": "STRONGHOLD_BUILDERS_GUIDEBOOK",
    "readable": "Stronghold Builders Guidebook"
  }, {
    "sourceEnum": "SWORD_AND_FIST_A_GUIDEBOOK_TO_MONKS_AND_FIGHTERS",
    "readable": "Sword and Fist: A Guidebook to Monks and Fighters"
  }, {
    "sourceEnum": "THE_FORGE_OF_WAR",
    "readable": "The Forge of War"
  }, {
    "sourceEnum": "THE_SHATTERED_GATES_OF_SLAUGHTERGARDE",
    "readable": "The Shattered Gates of Slaughtergarde"
  }, {
    "sourceEnum": "TOME_AND_BLOOD_A_GUIDEBOOK_TO_WIZARDS_AND_SORCERERS",
    "readable": "Tome and Blood: A Guidebook to Wizards and Sorcerers"
  }, {
    "sourceEnum": "TOME_OF_BATTLE_THE_BOOK_OF_NINE_SWORDS",
    "readable": "Tome of Battle: The Book of Nine Swords"
  }, {"sourceEnum": "TOME_OF_MAGIC", "readable": "Tome of Magic"}, {
    "sourceEnum": "UNAPPROACHABLE_EAST",
    "readable": "Unapproachable East"
  }, {"sourceEnum": "UNDERDARK", "readable": "Underdark"}, {
    "sourceEnum": "UNEARTHED_ARCANA",
    "readable": "Unearthed Arcana"
  }, {"sourceEnum": "WEAPONS_OF_LEGACY", "readable": "Weapons of Legacy"}, {"sourceEnum": "WEB", "readable": "Web"}]


}
