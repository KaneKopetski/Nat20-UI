import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../services/character-class-service/character-class.service';
import {RaceService} from '../services/race-service/race.service';
import {Race} from '../model/race/race';
import {CharacterBuildRequest} from '../model/character-build/character-build-request-model';
import {FeatService} from '../services/feat-service/feat.service';
import {Feat} from '../model/feat/feat-model';
import {DeityService} from '../services/deity-service/deity.service';
import {Deity} from '../model/deity/deity-model';
import {Skill} from '../model/skill/skill';
import {SkillService} from '../services/skill-service/skill.service';
import {Source} from '../model/source/source-model';
import {SourceService} from '../services/source-service/source.service';
import {MatChip} from '@angular/material/chips';
import {Constants} from '../../../shared/constants/constants';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error-response/error-response-model';
import {LevelClassPair} from '../model/level-class-pair/level-class-pair-model';
import {MatDialog} from '@angular/material/dialog';
import {ClassLevelManagerComponent} from '../class-level-manager/class-level-manager/class-level-manager.component';
import {pairwise, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {StandardArrayOption} from "../model/options/standard-array-option.model";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  baseAbilities: Array<string> = Constants.baseAbilities;

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  characterBuildRequest: CharacterBuildRequest;

  classLevels: Array<LevelClassPair> = [];
  private characterClassLevelMap: Map<number, CharacterClass> = new Map<number, CharacterClass>();
  characterClassLevelsDisplayHeaders: string[] = Constants.characterClassLevelsDisplayHeaders;

  selectedClass: CharacterClass;

  availableCharacterClasses: Array<CharacterClass>;
  availableRaces: Array<Race>;
  availableFeats: Array<Feat>;
  availableDeities: Array<Deity>;
  availableSkills: Array<Skill>;
  allSources: Array<Source>;

  selectable = true;
  removable = true;
  isLinear = false;
  selectAll = false;

  sourceSelectionForm: FormGroup;
  characterBuilderForm: FormGroup;

  abilityScoreInputColumns = Constants.abilityScoreInputColumns;
  abilityScoreInputData = Constants.baseAbilityScoreData;

  abilityScoreDisplayColumns: string[];
  abilityScoreDisplayData: any[];

  baseAbilityStyle = Constants.MANUAL;

  standardArrayOptions: Observable<Array<StandardArrayOption>>;

  pointBuyMap: Map<number, number> = Constants.pointBuyMap;

  get sourceChipsSelected() {
    return this.sourceSelectionForm.get(Constants.SOURCES_SELECTED);
  }

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService, private raceService: RaceService,
              private featService: FeatService, private deityService: DeityService, private skillService: SkillService,
              private sourceService: SourceService, private toastr: ToastrService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setupOptions();
    this.setupForms();
    this.getSourceOptions();
    this.toastr.overlayContainer = this.toastContainer;
    this.abilityScoreDisplayColumns = [Constants.ZERO].concat(this.abilityScoreInputData.map(x => x.position.toString()));
    this.abilityScoreDisplayData = this.abilityScoreInputColumns.map(x => this.formatInputRow(x));
    this.watchStandardArrayFormFields();
    this.watchPointBuyFormFields();
  }

  private setupOptions() {
    this.standardArrayOptions = of(Constants.standardArrayOptions);
  }

  private setupForms() {
    this.sourceSelectionForm = this.fb.group({
      firstCtrl: ['', Validators.required],
      sourcesSelected: []
    });
    this.characterBuilderForm = this.fb.group({
      buildName: ['', Validators.required],
      characterClasses: ['', Validators.required],
      strengthScoreManual: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      dexterityScoreManual: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      constitutionScoreManual: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      wisdomScoreManual: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      intelligenceScoreManual: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      charismaScoreManual: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      strengthScoreStandardArray: [Constants.DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      dexterityScoreStandardArray: [Constants.DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      constitutionScoreStandardArray: [Constants.DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      wisdomScoreStandardArray: [Constants.DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      intelligenceScoreStandardArray: [Constants.DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      charismaScoreStandardArray: [Constants.DEFAULT_STANDARD_ARRAY_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      strengthScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      dexterityScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      constitutionScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      wisdomScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      intelligenceScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      charismaScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE, Validators.required],
      totalPointBuy: [{value: 0, disabled: true}]
    });
  }

  private getSourceOptions() {
    this.sourceService.getAllSources().subscribe(res => {
      this.allSources = res;
    }, (error: ErrorResponse) => this.handleError(error));
  }

  public getCharacterBuilderFormSelectionValues() {
    this.characterClassService.getCharacterClasses().subscribe(res => this.availableCharacterClasses = res, (error: ErrorResponse) => this.handleError(error));
    this.deityService.getAllDeities().subscribe(res => this.availableDeities = res, (error: ErrorResponse) => this.handleError(error));
    this.featService.getAllFeats().subscribe(res => this.availableFeats = res, (error: ErrorResponse) => this.handleError(error));
    this.raceService.getAllRaces().subscribe(res => this.availableRaces = res, (error: ErrorResponse) => this.handleError(error));
    this.skillService.getAllSkills().subscribe(res => this.availableSkills = res, (error: ErrorResponse) => this.handleError(error));
  }

  public specialSourceHandling(specialChip: MatChip) {
    const chipValue: string = specialChip.value.trim();
    switch (chipValue) {
      case Constants.specialSourceCases.selectAll: {
        const values: string[] = [];
        this.allSources.forEach((source: Source) => values.push(source.sourceEnum));
        this.sourceChipsSelected.setValue(values);
        this.selectAll = true;
      }
      break;
      case Constants.specialSourceCases.selectNone: {
        this.sourceChipsSelected.reset();
        this.selectAll = false;
      }
      break;
      case Constants.specialSourceCases.coreOnly: {
        this.sourceChipsSelected.setValue(Constants.coreOnlySources);
        this.selectAll = false;
      }
      break;
      case Constants.specialSourceCases.srdOnly: {
        this.sourceChipsSelected.setValue(Constants.srdOnlySources);
        this.selectAll = false;
      }
      break;
      default: {
        this.handleError(Constants.defaultErrorResponse);
      }
    }
  }

  private handleError(error: ErrorResponse) {
    let errorMessage;
    let errorTitle;
    switch (error.status) {
      case 500: {
        errorMessage = Constants.GENERIC_ERROR_MSG;
        errorTitle = Constants.ERROR_TITLE_MSG;
      }         break;
      case 404: {
        errorTitle = Constants.RESOURCE_NOT_FOUND_MSG;
        errorMessage = Constants.CHARACTER_BUILDER_RESOURCE_ERROR_MSG;
      }         break;
    }
    this.toastr.error(errorMessage, errorTitle);
  }

  public addSelectedClassToClassLevels() {
    if (this.selectedClass) {
      const characterBuildLevel = this.characterClassLevelMap.size + 1;
      this.characterClassLevelMap.set(characterBuildLevel, this.selectedClass);
      this.classLevels.push({level: characterBuildLevel, characterClass: this.selectedClass});
    }
  }

  public getCharacterClassLevelsAsArray(): [number, CharacterClass][] {
    return Array.from(this.characterClassLevelMap);
  }

  private countInstancesOfEachCharacterClass(): Map<CharacterClass, number> {
    const characterClassCount: Map<CharacterClass, number> = new Map();
    this.characterClassLevelMap.forEach((characterClass) => {
      if (characterClassCount.has(characterClass)) {
        characterClassCount.set(characterClass, characterClassCount.get(characterClass) + 1);
      } else {
        characterClassCount.set(characterClass, 1);
      }
    });
    return characterClassCount;
  }

  private calculateBab(): number {
    const classCount = this.countInstancesOfEachCharacterClass();
    let bab = 0;
    classCount.forEach((count: number, charClass: CharacterClass) => {
      bab += Math.floor(count * charClass.baseAttackBonusProgression);
    });
    return bab;
  }

  formatInputRow(row) {
    const output = {};

    output[0] = row;
    this.abilityScoreInputData.forEach(item => {
      output[item.position] = item[row];
    });

    return output;
  }

  watchStandardArrayFormFields() {
    this.baseAbilities.forEach((baseAbilityScore: string) => {
        this.characterBuilderForm.get(baseAbilityScore + Constants.STANDARD_ARRAY_SUFFIX).valueChanges
          .pipe(startWith(this.characterBuilderForm.get(baseAbilityScore + Constants.STANDARD_ARRAY_SUFFIX).value), pairwise())
          .subscribe(([oldValue, newValue]) => {
            this.toggleAllowedFlagFalse(newValue);
            this.toggleAllowedFlagTrue(oldValue);
          }
        )
    });
  }

  watchPointBuyFormFields() {
    this.baseAbilities.forEach((baseAbilityScore: string) => {
      this.characterBuilderForm.get(baseAbilityScore + Constants.POINT_BUY_SUFFIX).valueChanges.subscribe(res => {
        this.characterBuilderForm.get('totalPointBuy').setValue(this.calculateTotalPoints());
      })
    })
  }

  removeClass(row) {
    console.log(row);
  }

  launchCharacterLevelManager() {
    this.dialog.open(ClassLevelManagerComponent, {
      data: [this.characterBuilderForm, this.sourceSelectionForm.get(Constants.SOURCES_SELECTED).value],
      width: '100%',
      height: '80%'
    });
  }

  toggleAllowedFlagFalse(value: number) {
    this.standardArrayOptions.subscribe((options: StandardArrayOption[]) => {
      options.forEach((option: StandardArrayOption) => {
        if (value === option.value) {
          option.isAllowed = false;
        }
      })
    })
  }

  toggleAllowedFlagTrue(value: number) {
    this.standardArrayOptions.subscribe((options: StandardArrayOption[]) => {
      options.forEach((option: StandardArrayOption) => {
        if (value === option.value) {
          option.isAllowed = true;
        }
      })
    })
  }

  private calculateTotalPoints(): number {
    let total: number = 0;
    this.baseAbilities.forEach((baseAbilityScore: string) => {
     let value = this.characterBuilderForm.get(baseAbilityScore + Constants.POINT_BUY_SUFFIX).value;
     let pointBuyValue: number = this.pointBuyMap.has(value) ? this.pointBuyMap.get(value) : 0;
     total += pointBuyValue;
    })
    return total;
  }
}


