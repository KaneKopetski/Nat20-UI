import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../character-class-service/character-class.service';
import {RaceService} from '../race-service/race.service';
import {Race} from '../model/race/race';
import {RaceBaseAbilityAdjustments} from "../model/race/race-base-ability-adjustments-model";

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  characterBuilderForm: FormGroup;
  characterClasses: Map<number, CharacterClass>;
  availableCharacterClasses: Array<CharacterClass>;
  availableRaces: Array<Race>;
  selectedClassId: number;
  selectedClass: CharacterClass;
  classLevelsDisplayedColumns: string[] = ['level', 'class'];
  baseAbilitiesDisplayedColumns: string[] = ['base-ability', 'score'];
  selectedRaceId: number;
  selectedRace: Race;
  baseAbilityScores: Map<string, number> = new Map();
  savingThrows: Map<string, number> = new Map();

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService, private raceService: RaceService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.characterClasses = new Map();
    this.getCharacterClassesDropdownValues();
    this.getAvailableRaces();
    this.getCharacterClassDetailsById();
    this.getRaceDetailsById();
    this.addBaseAbilityScore();
    this.updateSavingThrows();
  }

  private createForm() {
    this.characterBuilderForm = this.fb.group({
      buildName: ['',
        [Validators.required]
      ],
      characterClass: ['', Validators.compose([
        Validators.required
      ])],
      race: ['',
        [Validators.required]
      ],
      strengthScore: ['',
        [Validators.required]
      ],
      dexterityScore: ['',
        [Validators.required]
      ],
      constitutionScore: ['',
        [Validators.required]
      ],
      wisdomScore: ['',
        [Validators.required]
      ],
      intelligenceScore: ['',
        [Validators.required]
      ],
      charismaScore: ['',
        [Validators.required]
      ]
    });
  }

  private getCharacterClassesDropdownValues() {
    return this.characterClassService.getCharacterClasses().subscribe(res => {
      console.log(res);
      this.availableCharacterClasses = res;
    });
  }

  private getCharacterClassDetailsById() {
    this.characterBuilderForm.get('characterClass').valueChanges.subscribe(() => {
      return this.characterClassService.getCharacterClassById(this.selectedClassId)
        .subscribe(res => {
          this.selectedClass = res;
        });
    });
  }

  private getRaceDetailsById() {
    this.characterBuilderForm.get('race').valueChanges.subscribe(() => {
      return this.raceService.getRaceById(this.selectedRaceId)
        .subscribe(res => {
          this.selectedRace = res;
        });
    });
  }

  private getAvailableRaces() {
    this.raceService.getAllRaces().subscribe(res => {
      this.availableRaces = res;
    });
  }

  public addClassToBuild() {
    if (this.selectedClass) {
      const characterBuildLevel = this.characterClasses.size + 1;
      this.characterClasses.set(characterBuildLevel, this.selectedClass);
    }
  }

  public getSelectedClassesAsArray(): [number, CharacterClass][] {
    return Array.from(this.characterClasses);
  }

  private countInstancesOfEachCharacterClass(): Map<CharacterClass, number> {
    const characterClassCount: Map<CharacterClass, number> = new Map();
    this.characterClasses.forEach((characterClass) => {
      if (characterClassCount.has(characterClass)) {
        characterClassCount.set(characterClass, characterClassCount.get(characterClass) + 1);
      } else {
        characterClassCount.set(characterClass, 1);
      }
    });
    return characterClassCount;
  }

  public calculateBab(): number {
    const classCount = this.countInstancesOfEachCharacterClass();
    let bab = 0;
    classCount.forEach((count: number, charClass: CharacterClass) => {
      bab += Math.floor(count * charClass.baseAttackBonusProgression);
    });
    return bab;
  }

  public addBaseAbilityScore() {
    this.characterBuilderForm.get('race').valueChanges.subscribe(() => {
      let raceAbilityAdjustmentMap: Map<string, number> = new Map();
      this.selectedRace.abilityAdjustments.forEach((abilityAdjustment: RaceBaseAbilityAdjustments) => {
        raceAbilityAdjustmentMap.set(abilityAdjustment.baseAbility, abilityAdjustment.adjustment);
      })

      this.characterBuilderForm.get('strengthScore').valueChanges.subscribe(strengthValue => {
        let raceStrAdjustment = raceAbilityAdjustmentMap.get('STRENGTH') ? raceAbilityAdjustmentMap.get('STRENGTH') : 0;
        let strengthTotal: number = strengthValue + raceStrAdjustment;
        this.baseAbilityScores.set('STRENGTH', strengthTotal)
      });

      this.characterBuilderForm.get('dexterityScore').valueChanges.subscribe(dexterityValue => {
        let raceDexAdjustment = raceAbilityAdjustmentMap.get('DEXTERITY') ? raceAbilityAdjustmentMap.get('DEXTERITY') : 0;
        let dexterityTotal: number = dexterityValue + raceDexAdjustment;
        this.baseAbilityScores.set('DEXTERITY', dexterityTotal)
      });

      this.characterBuilderForm.get('constitutionScore').valueChanges.subscribe(constitutionValue => {
        let raceConAdjustment = raceAbilityAdjustmentMap.get('DEXTERITY') ? raceAbilityAdjustmentMap.get('DEXTERITY') : 0;
        let constitutionTotal: number = constitutionValue + raceConAdjustment;
        this.baseAbilityScores.set('CONSTITUTION', constitutionTotal)
      });

      this.characterBuilderForm.get('wisdomScore').valueChanges.subscribe(wisdomValue => {
        let raceWisAdjustment = raceAbilityAdjustmentMap.get('WISDOM') ? raceAbilityAdjustmentMap.get('WISDOM') : 0;
        let wisdomTotal: number = wisdomValue + raceWisAdjustment;
        this.baseAbilityScores.set('WISDOM', wisdomTotal)
      });

      this.characterBuilderForm.get('intelligenceScore').valueChanges.subscribe(intelligenceValue => {
        let raceIntAdjustment = raceAbilityAdjustmentMap.get('INTELLIGENCE') ? raceAbilityAdjustmentMap.get('INTELLIGENCE') : 0;
        let intelligenceTotal: number = intelligenceValue + raceIntAdjustment;
        this.baseAbilityScores.set('INTELLIGENCE', intelligenceTotal)
      });

      this.characterBuilderForm.get('charismaScore').valueChanges.subscribe(charismaValue => {
        let raceChaAdjustment = raceAbilityAdjustmentMap.get('CHARISMA') ? raceAbilityAdjustmentMap.get('CHARISMA') : 0;
        let charismaTotal: number = charismaValue + raceChaAdjustment;
        this.baseAbilityScores.set('CHARISMA', charismaTotal)
      });
    })
  }

  public getBaseAbilitiesAsArray(): [string, number][] {
    return Array.from(this.baseAbilityScores);
  }

  public calculateAndSetSavingThrow() {
    const savingThrowTypes: string[] = ['FORTITUDE', 'REFLEX', 'WILL'];
    const classCount = this.countInstancesOfEachCharacterClass();
    classCount.forEach((count: number, characterClass: CharacterClass) => {
      console.log('calculating saving throws...');
      savingThrowTypes.forEach(savingThrowType => {
        let savingThrowGoverningBaseAbility = this.getSavingThrowGoverningBaseAbility(savingThrowType);
        let savingThrowTotal;
        if (characterClass[CharacterBuilderComponent.getSavingThrowLabelForProgression(savingThrowType)] === 'GOOD') {
          savingThrowTotal = Math.floor(2 + (classCount.get(characterClass) / 2)) + CharacterBuilderComponent.calculateBaseAbilityModifier(savingThrowGoverningBaseAbility);
        } else {
          savingThrowTotal = Math.floor((classCount.get(characterClass) / 3) + CharacterBuilderComponent.calculateBaseAbilityModifier(savingThrowGoverningBaseAbility));
        }
        this.savingThrows.set(savingThrowType, savingThrowTotal);
      })
    })
  }

  private getSavingThrowGoverningBaseAbility(savingThrow: string) {
    switch (savingThrow) {
      case 'FORTITUDE': {
        return this.baseAbilityScores.get('CONSTITUTION')
      }
      case 'REFLEX': {
        return this.baseAbilityScores.get('DEXTERITY')
      }
      case 'WILL': {
        return this.baseAbilityScores.get('WISDOM')
      }
    }
  }

  private static getSavingThrowLabelForProgression(savingThrowProgression: string) {
    switch (savingThrowProgression) {
      case 'FORTITUDE': {
        return 'fortSaveProgression'
      }
      case 'REFLEX': {
        return 'reflexSaveProgression'
      }
      case 'WILL': {
        return 'willSaveProgression'
      }
    }
  }

  private static calculateBaseAbilityModifier(score: number): number {
    return Math.floor((score - 10) / 2);
  }

  public getSavingThrowsAsArray(): [string, number][] {
    return Array.from(this.savingThrows);
  }

  private updateSavingThrows() {
    this.characterBuilderForm.get('constitutionScore').valueChanges.subscribe(res => {
      console.log('form values changed');
      this.calculateAndSetSavingThrow();
    })

    this.characterBuilderForm.get('dexterityScore').valueChanges.subscribe(res => {
      console.log('form values changed');
      this.calculateAndSetSavingThrow();
    })

    this.characterBuilderForm.get('wisdomScore').valueChanges.subscribe(res => {
      console.log('form values changed');
      this.calculateAndSetSavingThrow();
    })
  }
}


