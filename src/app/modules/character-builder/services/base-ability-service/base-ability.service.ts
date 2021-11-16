import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseAbilityService {

  constructor() { }

  calculateBaseAbilityModifierForScore(score: number): number {
    return Math.floor((score - 10) / 2);
  }
}
