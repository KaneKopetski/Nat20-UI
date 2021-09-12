import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CharacterClass} from "../../model/character-class/character-class";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ClassFeature} from "../../model/character-class/class-feature-model";
import {Constants} from "../../../../shared/constants/constants";
import {Skill} from "../../model/skill/skill";

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

  characterClass: CharacterClass;
  dataSource: CharacterClassRow[];
  columnsToDisplay = ['level', 'babProgression', 'fortSaveProgression', 'reflexSaveProgression', 'willSaveProgression', 'classFeatures'];
  expandedElement: ClassFeature | null;
  classFeatures: Map<number, string>;
  tableDisplayHeaders: Map<string, string> = new Map([
    ['level', 'Level'],
    ['babProgression', 'Base Attack Bonus'],
    ['fortSaveProgression', 'Fort Save'],
    ['reflexSaveProgression', 'Reflex Save'],
    ['willSaveProgression', 'Will Save'],
    ['classFeatures', 'Special']
  ])

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit(): void {
    this.characterClass = this.data;
    this.organizeClassFeaturesByLevel();
    this.buildClassTableData();
  }

  ngOnDestroy(): void {
    this.characterClass = undefined;
    this.classFeatures = undefined;
  }

  private buildClassTableData() {
    console.log('datasource: ' + JSON.stringify(this.dataSource));
    let tableData: CharacterClassRow[] = [];
    this.dataSource = undefined;

    for (let i = 0; i < 20; i++) {
      let level = i + 1;
      let row: CharacterClassRow = {
        levelNum: i + 1,
        level: level + CharacterClassDetailComponent.getNumberSuffix(level),
        babProgression: CharacterClassDetailComponent.getBabProgressionForClassLevel(level, this.characterClass.baseAttackBonusProgression),
        fortSaveProgression: CharacterClassDetailComponent.calculateSavingThrow(level, this.characterClass.fortSaveProgression),
        reflexSaveProgression: CharacterClassDetailComponent.calculateSavingThrow(level, this.characterClass.reflexSaveProgression),
        willSaveProgression: CharacterClassDetailComponent.calculateSavingThrow(level, this.characterClass.willSaveProgression),
        classFeatures: this.classFeatures.get(level)
      }
      console.log('row data: ' + JSON.stringify(row));
      tableData.push(row)
    }

    console.log('table data: ' + JSON.stringify(tableData));
    this.dataSource = tableData;
  }

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
    } else
      return '+' + firstAttackBab;
  }

  private static getNumberSuffix(level: number): string {
    switch (level) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
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

  private organizeClassFeaturesByLevel() {
    let classFeatures: Map<number, string> = Constants.emptyClassFeatureByLevelMap;

      this.characterClass.classFeatures.forEach((classFeature: ClassFeature) => {
        console.log('class feature: ' + classFeature.name);
        let classFeaturesString = classFeatures.get(classFeature.levelAttained);
        if (classFeaturesString.length == 0) {
          classFeaturesString = classFeature.name
        } else {
          classFeaturesString = classFeaturesString + Constants.COMMA_SPACE + classFeature.name
        }
        classFeatures.set(classFeature.levelAttained, classFeaturesString);
      })
    this.classFeatures = classFeatures;
  }

  getClassFeaturesForLevelAsArray(level: number): string[] {
    if (this.classFeatures && (this.classFeatures.get(level).length != 0)) {
      let thing = this.classFeatures.get(level).split(Constants.COMMA_SPACE);
      console.log('class features: ' + JSON.stringify(thing));
      return thing;
    } else
      return [];
  }

  getClassFeatureDescriptionByName(name: string): string {
    let classFeatureDesc;
    this.characterClass.classFeatures.forEach((classFeature: ClassFeature) => {
      if (classFeature.name.startsWith(name)) {
        classFeatureDesc = classFeature.description;
      }
    })
    return classFeatureDesc;
  }

  getClassSkillsAsString(): string {
    let skills: string[] = [];
    this.characterClass.classSkills.forEach((skill: Skill) => {
      skills.push(skill.name);
    })
    return skills.join(Constants.COMMA_SPACE);
  }
}
