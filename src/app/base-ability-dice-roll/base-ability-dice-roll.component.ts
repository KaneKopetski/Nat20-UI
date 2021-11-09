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
  reRollOnes: boolean;
  rollTotal: number = 0;

  constructor(public dialogRef: MatDialogRef<BaseAbilityDiceRollComponent>) { }

  ngOnInit(): void {
  }

  roll() {
    if (this.rollStyle === '4d6b3') {
      this.rollTotal = 0;
      const rolls: number[] = [
        Math.floor(Math.random() * (7 - 1) + 1),
        Math.floor(Math.random() * (7 - 1) + 1),
        Math.floor(Math.random() * (7 - 1) + 1),
        Math.floor(Math.random() * (7 - 1) + 1)];

      if (this.reRollOnes) {
        rolls.forEach(roll => {
          if (roll === 1) {
            rolls.splice(rolls.indexOf(roll), 1, Math.floor(Math.random() * (7 - 1) + 1));
          }
        })
      }

      rolls.sort((n1, n2) => n1 - n2);
      rolls.splice(0, 1);
      rolls.forEach(roll => this.rollTotal += roll);
    }
  }

  close() {
    this.dialogRef.close(this.rollTotal);
  }
}
