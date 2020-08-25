import { Component, OnInit } from '@angular/core';
import { CharacterSummary } from "../character-summary-model";
import { SampleCharacterLists } from "../sample-character-lists";

@Component({
  selector: 'app-characters-landing',
  templateUrl: './characters-landing.component.html',
  styleUrls: ['./characters-landing.component.css']
})
export class CharactersLandingComponent implements OnInit {
  myCharacters: CharacterSummary[];
  publicCharacters: CharacterSummary[];

  constructor() {
    this.myCharacters = SampleCharacterLists.myCharacters;
    this.publicCharacters = SampleCharacterLists.publicCharacters;
  }

  ngOnInit(): void {
  }


}
