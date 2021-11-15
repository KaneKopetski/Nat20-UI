import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../../shared/constants/constants";
import {Race} from "../../model/race/race";
import {RaceBaseAbilityAdjustment} from "../../model/race/race-base-ability-adjustment-model";

@Injectable({
  providedIn: 'root'
})
export class CharacterBuilderFormService {

  public characterBuilderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.onInit();
  }

  onInit() {
    this.setupForms();
    this.watchFormControls();
  }

  private setupForms() {
    this.characterBuilderForm = this.fb.group({
      sourcesSelected: [],
      buildName: ['', Validators.required],
      raceSelected: ['', Validators.required],
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

  watchFormControls() {
    this.raceSelected.valueChanges.subscribe((raceSelected: Race) => {
      if (this.raceSelected.value.abilityAdjustments) {
        raceSelected.abilityAdjustments.forEach((adjustment: RaceBaseAbilityAdjustment) => {
          this.updateBaseAbilityScoreWithRacialAdjustment(adjustment);
        });
      }
    })

    this.baseAbilityScoreGenerationStyle.valueChanges.subscribe(() => {
      const raceSelected: Race = this.raceSelected.value;
      if (this.raceSelected.value.abilityAdjustments) {
        raceSelected.abilityAdjustments.forEach((adjustment: RaceBaseAbilityAdjustment) => {
          this.updateBaseAbilityScoreWithRacialAdjustment(adjustment);
        });
      }
    })
  }

  updateBaseAbilityScoreWithRacialAdjustment(adjustment: RaceBaseAbilityAdjustment) {
    const baseAbilityToAdjust: string = adjustment.baseAbility.toLowerCase();
    switch (baseAbilityToAdjust) {
      case 'strength': {
        this.strengthScore.patchValue(+this.strengthScore.value + adjustment.adjustment)
      } break;
      case 'dexterity': {
        this.dexterityScore.patchValue(+this.dexterityScore.value + adjustment.adjustment)
      } break;
      case 'constitution': {
        this.constitutionScore.patchValue(+this.constitutionScore.value + adjustment.adjustment)
      } break;
      case 'wisdom': {
        this.wisdomScore.patchValue(+this.wisdomScore.value + adjustment.adjustment)
      } break;
      case 'intelligence': {
        this.intelligenceScore.patchValue(+this.intelligenceScore.value + adjustment.adjustment)
      } break;
      case 'charisma': {
        this.charismaScore.patchValue(+this.charismaScore.value + adjustment.adjustment)
      } break;
    }
  }

  get raceSelected() {
    return this.characterBuilderForm.get('raceSelected');
  }

  get baseAbilityScoreGenerationStyle() {
    return this.characterBuilderForm.get('abilityScoreGenerationMethod');
  }

  get strengthScore() {
    switch (this.baseAbilityScoreGenerationStyle.value) {
      case 'manual': {
        return this.characterBuilderForm.get('strengthScoreManual');
      }
      case 'standardArray': {
        return this.characterBuilderForm.get('strengthScoreStandardArray');
      }
      case 'pointBuy': {
        return this.characterBuilderForm.get('strengthScorePointBuy');
      }
      case 'diceRolls': {
        return this.characterBuilderForm.get('strengthScoreDiceRoll');
      }
    }
  }

  get dexterityScore() {
    switch (this.baseAbilityScoreGenerationStyle.value) {
      case 'manual': {
        return this.characterBuilderForm.get('dexterityScoreManual');
      }
      case 'standardArray': {
        return this.characterBuilderForm.get('dexterityScoreStandardArray');
      }
      case 'pointBuy': {
        return this.characterBuilderForm.get('dexterityScorePointBuy');
      }
      case 'diceRolls': {
        return this.characterBuilderForm.get('dexterityScoreDiceRoll');
      }
    }
  }

  get constitutionScore() {
    switch (this.baseAbilityScoreGenerationStyle.value) {
      case 'manual': {
        return this.characterBuilderForm.get('constitutionScoreManual');
      }
      case 'standardArray': {
        return this.characterBuilderForm.get('constitutionScoreStandardArray');
      }
      case 'pointBuy': {
        return this.characterBuilderForm.get('constitutionScorePointBuy');
      }
      case 'diceRolls': {
        return this.characterBuilderForm.get('constitutionScoreDiceRoll');
      }
    }
  }

  get wisdomScore() {
    switch (this.baseAbilityScoreGenerationStyle.value) {
      case 'manual': {
        return this.characterBuilderForm.get('wisdomScoreManual');
      }
      case 'standardArray': {
        return this.characterBuilderForm.get('wisdomScoreStandardArray');
      }
      case 'pointBuy': {
        return this.characterBuilderForm.get('wisdomScorePointBuy');
      }
      case 'diceRolls': {
        return this.characterBuilderForm.get('wisdomScoreDiceRoll');
      }
    }
  }

  get intelligenceScore() {
    switch (this.baseAbilityScoreGenerationStyle.value) {
      case 'manual': {
        return this.characterBuilderForm.get('intelligenceScoreManual');
      }
      case 'standardArray': {
        return this.characterBuilderForm.get('intelligenceScoreStandardArray');
      }
      case 'pointBuy': {
        return this.characterBuilderForm.get('intelligenceScorePointBuy');
      }
      case 'diceRolls': {
        return this.characterBuilderForm.get('intelligenceScoreDiceRoll');
      }
    }
  }

  get charismaScore() {
    switch (this.baseAbilityScoreGenerationStyle.value) {
      case 'manual': {
        return this.characterBuilderForm.get('charismaScoreManual');
      }
      case 'standardArray': {
        return this.characterBuilderForm.get('charismaScoreStandardArray');
      }
      case 'pointBuy': {
        return this.characterBuilderForm.get('charismaScorePointBuy');
      }
      case 'diceRolls': {
        return this.characterBuilderForm.get('charismaScoreDiceRoll');
      }
    }
  }

}
