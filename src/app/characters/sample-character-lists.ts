import {CharacterSummary} from "./character-summary-model";

export class SampleCharacterLists {

public static myCharacters: Array<CharacterSummary> = [{
  id: 1,
  name: "Ellyrion",
  physicalTraits: {
    heightFeet: 5,
    heightInches: 2,
    weight: 120,
    size: "Medium",
    race: {
      raceId: 3,
      raceName: "Half-Orc"
    },
    gender: "Female",
    hairColor: "Brown",
    eyeColor: "White"
  },
  baseAttackBonus: 3,
  creator: "KaneK899",
  classSummary: "Barbarian 2/Ranger 1/Crusader 5",
  alignment: "Chaotic Good",
  portrait: {
    "imageId": "image1",
    "fileName": "ellyrion-portrait.png",
    "fileType": "png",
    "data": new Blob
  },
  description: "Some random description about the character maybe limited to a couple of hundred chars.",
  quote: '"This is a quote"',
  level: 20,
  edition: '3.5',
  isFlipped: false,
  savingThrows: {
    fortitude: 3,
    will: 5,
    reflex: 2
  },
  abilityScores: {
    strength: 15,
    strMod: 2,
    dexterity: 12,
    dexMod: 1,
    constitution: 13,
    conMod: 1,
    wisdom: 10,
    wisMod: 0,
    intelligence: 6,
    intMod: -2,
    charisma: 8,
    chaMod: -1
  }
},
  {
    id: 2,
    name: "Nyasia",
    physicalTraits: {
      heightFeet: 5,
      heightInches: 5,
      weight: 115,
      size: "Medium",
      race: {
        raceId: 1,
        raceName: "Half-Elf"
      },
      gender: "Female",
      hairColor: "Black",
      eyeColor: "Yellow"
    },
    baseAttackBonus: 3,
    creator: "KaneK899",
    classSummary: "Monk 2/Ranger 1/Fighter 3",
    alignment: "Chaotic Neutral",
    portrait: {
      imageId: "image1",
      fileName: "ellyrion-portrait.png",
      fileType: "png",
      data: new Blob
    },
    description: "Some random description about the character maybe limited to a couple of hundred chars.",
    quote: '"This is a quote"',
    level: 20,
    edition: '3.5',
    isFlipped: false,
    savingThrows: {
      fortitude: 5,
      will: 1,
      reflex: 3
    },
    abilityScores: {
      strength: 10,
      strMod: 0,
      dexterity: 12,
      dexMod: 1,
      constitution: 13,
      conMod: 1,
      wisdom: 24,
      wisMod: 7,
      intelligence: 16,
      intMod: 3,
      charisma: 12,
      chaMod: 1
    }
  }]

public static publicCharacters: Array<CharacterSummary> = [{
  id: 3,
  name: "Annalysia",
  physicalTraits: {
    heightFeet: 4,
    heightInches: 11,
    weight: 95,
    size: "Medium",
    race: {
      raceId: 2,
      raceName: "Human"
    },
    gender: "Female",
    hairColor: "Blond",
    eyeColor: "Green"
  },
  baseAttackBonus: 3,
  creator: "KaneK899",
  classSummary: "Barbarian 2/Ranger 1",
  alignment: "Neutral Evil",
  portrait: {
    imageId: "image1",
    fileName: "ellyrion-portrait.png",
    fileType: "png",
    data: new Blob
  },
  quote: '"This is a quote"',
  level: 20,
  edition: '3.5',
  isFlipped: false,
  savingThrows: {
    fortitude: 8,
    will: 5,
    reflex: 88
  },
  abilityScores: {
    strength: 15,
    strMod: 2,
    dexterity: 21,
    dexMod: 5,
    constitution: 13,
    conMod: 1,
    wisdom: 14,
    wisMod: 2,
    intelligence: 20,
    intMod: 5,
    charisma: 16,
    chaMod: 3
  }
},
  {
    id: 4,
    name: "Valetta",
    physicalTraits: {
      heightFeet: 5,
      heightInches: 9,
      weight: 105,
      size: "Medium",
      race: {
        raceId: 1,
        raceName: "Half-Elf"
      },
      gender: "Female",
      hairColor: "White",
      eyeColor: "Red"
    },
    baseAttackBonus: 3,
    creator: "KaneK899",
    classSummary: "Monk 2/Ranger 1",
    alignment: "Neutral Neutral",
    portrait: {
      imageId: "image1",
      fileName: "ellyrion-portrait.png",
      fileType: "png",
      data: new Blob
    },
    isFlipped: false,
    description: "Some random description about the character maybe limited to a couple of hundred chars.",
    quote: '"This is a quote"',
    level: 20,
    edition: '3.5',
    savingThrows: {
      fortitude: 65,
      will: 23,
      reflex: 43
    },
    abilityScores: {
      strength: 12,
      strMod: 1,
      dexterity: 22,
      dexMod: 6,
      constitution: 13,
      conMod: 1,
      wisdom: 14,
      wisMod: 2,
      intelligence: 15,
      intMod: 2,
      charisma: 16,
      chaMod: 3
    }
  }]
}
