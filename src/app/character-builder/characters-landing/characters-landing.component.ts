import { Component, OnInit } from '@angular/core';
import { CharacterSummary } from '../character-summary-model';
import { SampleCharacterLists } from '../sample-character-lists';
import { CharacterService } from '../character.service';
import { CharacterTemplateRequest } from '../character-request';

@Component({
  selector: 'app-characters-landing',
  templateUrl: './characters-landing.component.html',
  styleUrls: ['./characters-landing.component.css']
})
export class CharactersLandingComponent implements OnInit {
  myCharacters: CharacterSummary[];
  publicCharacters: CharacterSummary[];
  data: any;

  constructor(private characterTemplateService: CharacterService) {
    this.myCharacters = SampleCharacterLists.myCharacters;
    this.publicCharacters = SampleCharacterLists.publicCharacters;
  }

  ngOnInit(): void {
  }

  getCharacterById() {
    this.characterTemplateService.getCharacterById().subscribe(res => {
      this.data = res;
    });
  }

  testGetToken() {
    console.log(localStorage.getItem('userToken'));
  }


}
