import {Skill} from "./skill";

export class SkillRankPair {
  id: number;
  skill: Skill;
  ranks: number;

  constructor(skill: Skill, ranks?: number) {
    this.skill = skill;
    ranks ? this.ranks = ranks : this.ranks = 0;
  }
}
