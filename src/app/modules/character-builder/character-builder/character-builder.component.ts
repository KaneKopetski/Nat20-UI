import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CharacterClass} from '../model/character-class/character-class';
import {CharacterClassService} from '../character-class-service/character-class.service';

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent implements OnInit {

  characterBuilderForm: FormGroup;
  characterClasses: Map<number, CharacterClass>;
  availableCharacterClasses: Array<CharacterClass>;
  selected: number;
  selectedClassDetails: CharacterClass;

  constructor(private fb: FormBuilder, private characterClassService: CharacterClassService) { }

  ngOnInit(): void {
    this.createForm();
    this.characterClasses = new Map();
    this.getCharacterClassesDropdownValues();
    this.getCharacterClassDetailsById();
  }

  private createForm() {
    this.characterBuilderForm = this.fb.group({
      buildName: [  '',
        [ Validators.required, Validators.email ]
      ],
      characterClass: [ '', Validators.compose([
        Validators.required
      ])]});
  }

  private getCharacterClassesDropdownValues() {
    return this.characterClassService.getCharacterClasses().subscribe(res => {
      console.log(res);
      this.availableCharacterClasses = res;
    });
  }

  private getCharacterClassDetailsById() {
    this.characterBuilderForm.get('characterClass').valueChanges.subscribe(newValue => {
      return this.characterClassService.getCharacterClassById(this.selected)
        .subscribe(res => {
          this.selectedClassDetails = res;
        });
    });
  }

}
