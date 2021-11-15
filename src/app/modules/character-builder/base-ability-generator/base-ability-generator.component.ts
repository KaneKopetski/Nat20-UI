import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../shared/constants/constants";
import {BaseAbilityDiceRollComponent} from "../base-ability-dice-roll/base-ability-dice-roll.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {StandardArrayOption} from "../model/options/standard-array-option.model";
import {pairwise, startWith} from "rxjs/operators";
import {CharacterBuilderFormService} from "../services/characer-builder-form-service/character-builder-form.service";

@Component({
  selector: 'app-base-ability-generator',
  templateUrl: './base-ability-generator.component.html',
  styleUrls: ['./base-ability-generator.component.css']
})
export class BaseAbilityGeneratorComponent implements OnInit {

  baseAbilityStyle = Constants.MANUAL;
  baseAbilities: Array<string> = Constants.baseAbilities;
  standardArrayOptions: Observable<Array<StandardArrayOption>>;
  pointBuyMap: Map<number, number> = Constants.pointBuyMap;

  constructor(private dialog: MatDialog, public cbFormService: CharacterBuilderFormService) { }

  ngOnInit(): void {
    this.setupOptions();
    this.watchStandardArrayFormFields();
    this.watchPointBuyFormFields();
  }

  private setupOptions() {
    this.standardArrayOptions = of(Constants.standardArrayOptions);
  }

  launchDiceRollModal(ability: string) {
    const dialogRef = this.dialog.open(BaseAbilityDiceRollComponent, {
      data: ability,
      width: '20%',
      minHeight: '55%',
      maxHeight: '75%'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.cbFormService.characterBuilderForm.get(ability + Constants.DICE_ROLL_SUFFIX).patchValue(res);
    });
  }

  watchStandardArrayFormFields() {
    this.baseAbilities.forEach((baseAbilityScore: string) => {
      this.cbFormService.characterBuilderForm.get(baseAbilityScore + Constants.STANDARD_ARRAY_SUFFIX).valueChanges
        .pipe(startWith(this.cbFormService.characterBuilderForm.get(baseAbilityScore + Constants.STANDARD_ARRAY_SUFFIX).value), pairwise())
        .subscribe(([oldValue, newValue]) => {
            this.toggleAllowedFlagFalse(newValue);
            this.toggleAllowedFlagTrue(oldValue);
          }
        )
    });
  }

  watchPointBuyFormFields() {
    this.baseAbilities.forEach((baseAbilityScore: string) => {
      this.cbFormService.characterBuilderForm.get(baseAbilityScore + Constants.POINT_BUY_SUFFIX).valueChanges.subscribe(() => {
        this.cbFormService.characterBuilderForm.get('totalPointBuy').setValue(this.calculateTotalPoints());
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
      let value = this.cbFormService.characterBuilderForm.get(baseAbilityScore + Constants.POINT_BUY_SUFFIX).value;
      let pointBuyValue: number = this.pointBuyMap.has(value) ? this.pointBuyMap.get(value) : 0;
      total += pointBuyValue;
    })
    return total;
  }

}
