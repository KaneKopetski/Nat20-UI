import {Component, Input, OnInit} from '@angular/core';
import {Constants} from "../../../shared/constants/constants";
import {LevelClassPair} from "../model/level-class-pair/level-class-pair-model";
import {CharacterClass} from "../model/character-class/character-class";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-build-summary',
  templateUrl: './build-summary.component.html',
  styleUrls: ['./build-summary.component.css']
})
export class BuildSummaryComponent implements OnInit {
  @Input() characterBuilderForm: FormGroup;

  abilityScoreInputColumns = Constants.abilityScoreInputColumns;
  abilityScoreInputData = Constants.baseAbilityScoreData;

  abilityScoreDisplayColumns: string[];
  abilityScoreDisplayData: any[];

  classLevels: Array<LevelClassPair> = [];
  private characterClassLevelMap: Map<number, CharacterClass> = new Map<number, CharacterClass>();
  characterClassLevelsDisplayHeaders: string[] = Constants.characterClassLevelsDisplayHeaders;

  constructor() { }

  ngOnInit(): void {
    this.abilityScoreDisplayColumns = [Constants.ZERO].concat(this.abilityScoreInputData.map(x => x.position.toString()));
    this.abilityScoreDisplayData = this.abilityScoreInputColumns.map(x => this.formatInputRow(x));
  }

  removeClass(row) {
  }

  public getCharacterClassLevelsAsArray(): [number, CharacterClass][] {
    return Array.from(this.characterClassLevelMap);
  }

  formatInputRow(row) {
    const output = {};

    output[0] = row;
    this.abilityScoreInputData.forEach(item => {
      output[item.position] = item[row];
    });

    return output;
  }
}
