import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CharacterClass} from '../../model/character-class/character-class';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ClassFeature} from '../../model/character-class/class-feature-model';
import {Constants} from '../../../../shared/constants/constants';
import {Skill} from '../../model/skill/skill';

export interface CharacterClassRow {
  levelNum: number;
  level: string;
  babProgression: string;
  fortSaveProgression: number;
  reflexSaveProgression: number;
  willSaveProgression: number;
  classFeatures: string;
}

@Component({
  selector: 'app-character-class-detail',
  templateUrl: './character-class-detail.component.html',
  styleUrls: ['./character-class-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CharacterClassDetailComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
  }

  characterClass: CharacterClass;
  dataSource: CharacterClassRow[];
  columnsToDisplay = ['level', 'babProgression', 'fortSaveProgression', 'reflexSaveProgression', 'willSaveProgression', 'classFeatures'];
  expandedElement: ClassFeature | null;
  tableDisplayHeaders: Map<string, string> = new Map([
    ['level', 'Level'],
    ['babProgression', 'Base Attack Bonus'],
    ['fortSaveProgression', 'Fort Save'],
    ['reflexSaveProgression', 'Reflex Save'],
    ['willSaveProgression', 'Will Save'],
    ['classFeatures', 'Special']
  ]);

  private static getBabProgressionForClassLevel(level: number, baseAttackBonusProgression: number): string {
    const firstAttackBab = Math.floor(level * baseAttackBonusProgression);
    const secondAttackBab = Math.floor(level * baseAttackBonusProgression - 5);
    const thirdAttackBab = Math.floor(level * baseAttackBonusProgression - 10);
    const fourthAttackBab = Math.floor(level * baseAttackBonusProgression - 15);

    if (firstAttackBab >= 16) {
      return '+' + firstAttackBab + '/+' + secondAttackBab + '/+' + thirdAttackBab + '/+' + fourthAttackBab;
    } else if (firstAttackBab >= 11) {
      return '+' + firstAttackBab + '/+' + secondAttackBab + '/+' + thirdAttackBab;
    } else if (firstAttackBab >= 6) {
      return '+' + firstAttackBab + '/+' + secondAttackBab;
    } else {
      return '+' + firstAttackBab;
 }
  }

  private static getNumberSuffix(level: number): string {
    switch (level) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  private static calculateSavingThrow(level: number, saveProgression: string): number {
    switch (saveProgression) {
      case 'GOOD':
        return Math.floor(2 + (level / 2));
      default:
        return Math.floor(level / 3);
    }
  }

  ngOnInit(): void {
    this.characterClass = this.data;
    this.buildClassTableData();
  }

  ngOnDestroy(): void {
    this.characterClass = undefined;
  }

  private buildClassTableData() {
    const tableData: CharacterClassRow[] = [];
    this.dataSource = undefined;

    for (let i = 0; i < 20; i++) {
      const level = i + 1;
      const row: CharacterClassRow = {
        levelNum: i + 1,
        level: level + CharacterClassDetailComponent.getNumberSuffix(level),
        babProgression: CharacterClassDetailComponent.getBabProgressionForClassLevel(level, this.characterClass.baseAttackBonusProgression),
        fortSaveProgression: CharacterClassDetailComponent.calculateSavingThrow(level, this.characterClass.fortSaveProgression),
        reflexSaveProgression: CharacterClassDetailComponent.calculateSavingThrow(level, this.characterClass.reflexSaveProgression),
        willSaveProgression: CharacterClassDetailComponent.calculateSavingThrow(level, this.characterClass.willSaveProgression),
        classFeatures: this.getClassFeaturesForLevel(level).join(Constants.COMMA_SPACE)
      };
      tableData.push(row);
    }

    this.dataSource = tableData;
  }

  getClassFeatureDescriptionByName(name: string): string {
    let classFeatureDesc;
    this.characterClass.classFeatures.forEach((classFeature: ClassFeature) => {
      if (classFeature.name.startsWith(name)) {
        classFeatureDesc = classFeature.description;
      }
    });
    return classFeatureDesc;
  }

  getClassSkillsAsString(): string {
    const skills: string[] = [];
    this.characterClass.classSkills.forEach((skill: Skill) => {
      skills.push(skill.name);
    });
    return skills.join(Constants.COMMA_SPACE);
  }

  getClassFeaturesForLevel(level: number): string[] {
    const classFeatures: string[] = [];

    this.characterClass.classFeatures.forEach((classFeature: ClassFeature) => {
      if (classFeature.levelAttained === level) {
        classFeatures.push(classFeature.name);
      }
    });

    return classFeatures;
  }
}
