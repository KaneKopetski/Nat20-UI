import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

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

  constructor(public dialogRef: MatDialogRef<BaseAbilityDiceRollComponent>) { }

  ngOnInit(): void {
  }

  roll() {
    if (this.rollStyle === '4d6b3') {
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
  }
}
