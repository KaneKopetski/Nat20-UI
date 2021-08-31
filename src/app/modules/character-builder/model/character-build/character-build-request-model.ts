export interface CharacterBuildRequest {
  id: number;
  name: string;
  description: string;
  raceId: number;
  deityId: number;
  classes: Map<number, number>;
  languages: string;
  visibility: string;
  baseAbilityScores: Map<number, number>;
  featLevelPairs: Map<number, number>;
  skillRanks: Map<string, number>;
  createdBy;
}
