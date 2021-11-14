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
import {Constants} from '../../../shared/constants/constants';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error-response/error-response-model';
import {MatDialog} from '@angular/material/dialog';
import {pairwise, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {StandardArrayOption} from "../model/options/standard-array-option.model";
import {BaseAbilityDiceRollComponent} from "../base-ability-dice-roll/base-ability-dice-roll.component";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  baseAbilities: Array<string> = Constants.baseAbilities;

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;

  characterBuildRequest: CharacterBuildRequest;

  selectable = true;
  removable = true;
  isLinear = false;

  characterBuilderForm: FormGroup;

  baseAbilityStyle = Constants.MANUAL;

  standardArrayOptions: Observable<Array<StandardArrayOption>>;

  pointBuyMap: Map<number, number> = Constants.pointBuyMap;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setupOptions();
    this.setupForms();
    this.toastr.overlayContainer = this.toastContainer;
    this.watchStandardArrayFormFields();
    this.watchPointBuyFormFields();
  }

  private setupOptions() {
    this.standardArrayOptions = of(Constants.standardArrayOptions);
  }

  private setupForms() {
    this.characterBuilderForm = this.fb.group({
      sourcesSelected: [],
      buildName: ['', Validators.required],
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
      strengthScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE,
        Validators.compose([Validators.required, Validators.max(18), Validators.min(8)])],
      dexterityScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE,
        Validators.compose([Validators.required, Validators.max(18), Validators.min(8)])],
      constitutionScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE,
        Validators.compose([Validators.required, Validators.max(18), Validators.min(8)])],
      wisdomScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE,
        Validators.compose([Validators.required, Validators.max(18), Validators.min(8)])],
      intelligenceScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE,
        Validators.compose([Validators.required, Validators.max(18), Validators.min(8)])],
      charismaScorePointBuy: [Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE,
        Validators.compose([Validators.required, Validators.max(18), Validators.min(8)])],
      totalPointBuy: [{value: 0, disabled: true}],
      abilityScoreGenerationMethod: ['manual'],
      strengthScoreDiceRoll: [{value: Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE}, Validators.required],
      dexterityScoreDiceRoll: [{value: Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE}, Validators.required],
      constitutionScoreDiceRoll: [{value: Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE}, Validators.required],
      wisdomScoreDiceRoll: [{value: Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE}, Validators.required],
      intelligenceScoreDiceRoll: [{value: Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE}, Validators.required],
      charismaScoreDiceRoll: [{value: Constants.DEFAULT_MANUAL_BASE_ABILITY_ENTRY_VALUE}, Validators.required]
    });
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
      this.characterBuilderForm.get(baseAbilityScore + Constants.POINT_BUY_SUFFIX).valueChanges.subscribe(() => {
        this.characterBuilderForm.get('totalPointBuy').setValue(this.calculateTotalPoints());
      })
    })
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

  launchDiceRollModal(ability: string) {
    const dialogRef = this.dialog.open(BaseAbilityDiceRollComponent, {
      data: ability,
      width: '20%',
      minHeight: '55%',
      maxHeight: '75%'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.characterBuilderForm.get(ability + Constants.DICE_ROLL_SUFFIX).patchValue(res);
    });
  }
}


