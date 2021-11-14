import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterBuildRequest} from '../model/character-build/character-build-request-model';
import {Constants} from '../../../shared/constants/constants';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {ErrorResponse} from '../model/error-response/error-response-model';
import {MatDialog} from '@angular/material/dialog';
import {pairwise, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {StandardArrayOption} from "../model/options/standard-array-option.model";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {


  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;

  characterBuildRequest: CharacterBuildRequest;

  selectable = true;
  removable = true;
  isLinear = false;

  characterBuilderForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.setupForms();
    this.toastr.overlayContainer = this.toastContainer;
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


}


