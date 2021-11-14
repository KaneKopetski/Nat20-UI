import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-base-ability-dice-roll',
  templateUrl: './base-ability-dice-roll.component.html',
  styleUrls: ['./base-ability-dice-roll.component.css']
})
export class BaseAbilityDiceRollComponent implements OnInit {
  rollStyle: string = '4d6b3';
  reRollOnes: boolean = false;
  rollTotal: number = 0;
  rolls: number[];
  droppedRoll: number;
  rollTotalFormControl: FormControl = new FormControl();
  customRoll: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<BaseAbilityDiceRollComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  roll() {
    switch (this.rollStyle) {
      case '4d6b3': {
          this.handle4d6DropLowestRolls();
      } break;
      case '3d6': {
        this.handle3d6Rolls();
      } break;
      default: {
        this.handleCustomRoll();
      }
    }
  }

  handle4d6DropLowestRolls() {
    const rolls: number[] = [
      Math.floor(Math.random() * (7 - 1) + 1),
      Math.floor(Math.random() * (7 - 1) + 1),
      Math.floor(Math.random() * (7 - 1) + 1),
      Math.floor(Math.random() * (7 - 1) + 1)];

    this.doReRollOnes(rolls);

    rolls.sort((n1, n2) => n1 - n2);
    this.droppedRoll = rolls[0];
    rolls.splice(0, 1);
    this.rolls = rolls;
    this.calculateRollTotal();
  }

  handle3d6Rolls() {
    const rolls: number[] = [
      Math.floor(Math.random() * (7 - 1) + 1),
      Math.floor(Math.random() * (7 - 1) + 1),
      Math.floor(Math.random() * (7 - 1) + 1)];

    this.doReRollOnes(rolls);

    rolls.sort((n1, n2) => n1 - n2);
    this.rolls = rolls;
    this.calculateRollTotal();
  }

  handleCustomRoll() {
    const customRoll: string = this.customRoll.value;
    const customRollArray1: string[] = customRoll.split('d');
    let customRollArray2: string[];

    if (customRollArray1[1].includes('b')) {
      customRollArray2 = customRollArray1[1].split('b');
      customRollArray1[1] = customRollArray2[0];
      customRollArray1.push(customRollArray2[1]);
    }
    const numberOfRolls = +customRollArray1[0];
    const numberOfSides = +customRollArray1[1];
    const dropLowest = customRollArray1.length === 3;

    const rolls: number[] = [];
    for (let i = 0; i < numberOfRolls; i++) {
      rolls.push(Math.floor(Math.random() * ((numberOfSides + 1) - 1) + 1));
    }

    if (dropLowest) {
      rolls.sort((n1, n2) => n1 - n2);
      this.droppedRoll = rolls[0];
      rolls.splice(0, 1);
    }

    this.rolls = rolls;
    this.calculateRollTotal();
  }

  acceptResult() {
    this.dialogRef.close(this.rollTotal);
  }

  private doReRollOnes(rolls: number[]) {
    let finalResult: number[] = rolls;
    if (this.reRollOnes) {
      finalResult.forEach(roll => {
        if (roll === 1) {
          finalResult.splice(finalResult.indexOf(roll), 1, Math.floor(Math.random() * (7 - 1) + 1));
          this.doReRollOnes(finalResult);
        }
      })
    }
    return finalResult;
  }

  reRollSingleRoll(i: number) {
    this.rolls[i] = Math.floor(Math.random() * (7 - 1) + 1);
    this.calculateRollTotal();
  }

  calculateRollTotal() {
    this.rollTotal = 0;
    this.rolls.forEach(roll => this.rollTotal += roll);
    this.rollTotalFormControl.setValue(this.rollTotal);
  }

  reset() {
    this.rollTotal = 0;
    this.rolls = [];
    this.droppedRoll = undefined;
  }

  cancelAndClose() {
    this.dialogRef.close();
  }
}
