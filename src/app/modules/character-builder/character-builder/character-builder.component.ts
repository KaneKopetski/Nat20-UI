import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../character-class-service/character-class.service';
import {RaceService} from '../race-service/race.service';
import {RaceModel} from '../model/race/race-model';

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  characterBuilderForm: FormGroup;
  characterClasses: Map<number, CharacterClass>;
  availableCharacterClasses: Array<CharacterClass>;
  availableRaces: Array<RaceModel>;
  selectedClassId: number;
  selectedClass: CharacterClass;
  displayedColumns: string[] = ['level', 'class'];
  selectedRaceId: any;
  selectedRace: RaceModel;

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService, private raceService: RaceService) { }

  ngOnInit(): void {
    this.createForm();
    this.characterClasses = new Map();
    this.getCharacterClassesDropdownValues();
    this.getAvailableRaces();
    this.getCharacterClassDetailsById();
    this.getRaceDetailsById();
  }

  private createForm() {
    this.characterBuilderForm = this.fb.group({
      buildName: [  '',
        [ Validators.required ]
      ],
      characterClass: [ '', Validators.compose([
        Validators.required
      ])],
      race: [  '',
      [ Validators.required ]
  ],
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

  addClassToBuild() {
    if (this.selectedClass) {
      const characterBuildLevel = this.characterClasses.size + 1;
      this.characterClasses.set(characterBuildLevel, this.selectedClass);
    }
  }

  getSelectedClassesAsArray(): [number, CharacterClass][] {
    return Array.from(this.characterClasses);
  }
}
