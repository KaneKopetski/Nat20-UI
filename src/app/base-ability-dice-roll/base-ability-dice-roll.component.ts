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
  allocationMethod: string = 'automatic';
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
      } break;
      case '3d6': {
        const rolls: number[] = [
          Math.floor(Math.random() * (7 - 1) + 1),
          Math.floor(Math.random() * (7 - 1) + 1),
          Math.floor(Math.random() * (7 - 1) + 1)];

        this.doReRollOnes(rolls);

        rolls.sort((n1, n2) => n1 - n2);
        this.rolls = rolls;
        this.calculateRollTotal();
      } break;
      default: {
        const customRoll: string = this.customRoll.value;
        const customRollArray1: string[] = customRoll.split('d');
        const customRollArray2: string[] = customRoll.split('b');
        console.log(customRollArray1);
        console.log(customRollArray2);
      }
    }


  }

  close() {
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
}
