export class CharacterSummary {
  id: number;
  name: string;
  physicalTraits: {
    heightFeet: number;
    heightInches: number
    weight: number;
    size: string;
    race: {
      raceId: number;
      raceName: string;
    }
    gender: string;
    hairColor: string;
    eyeColor: string
  }
  baseAttackBonus: number;
  creator: string;
  classSummary: string;
  alignment: string;
  portrait: {
    imageId: string
    fileName: string;
    fileType: string;
    data: Blob;
  }
  description?: string;
  quote?: string;
  level: number;
  edition: string;
  isFlipped: boolean;
  savingThrows: {
    fortitude: number;
    will: number;
    reflex: number;
  }
  abilityScores: {
    strength: number;
    strMod: number;
    dexterity: number;
    dexMod: number;
    constitution: number;
    conMod: number;
    wisdom: number;
    wisMod: number;
    intelligence: number;
    intMod: number;
    charisma: number;
    chaMod: number;
  }
}
