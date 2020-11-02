import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { CharacterPageModel } from '../model/character/character-page-model';
import { CharacterTemplateModel } from '../model/character/character-template-model';

@Component({
  selector: 'app-characters-landing',
  templateUrl: './characters-landing.component.html',
  styleUrls: ['./characters-landing.component.css']
})
export class CharactersLandingComponent implements OnInit {

  myCharacters: Array<CharacterTemplateModel>;
  newestCharacters: Array<CharacterTemplateModel>;

  constructor(private characterTemplateService: CharacterService) {
  }

  ngOnInit(): void {
    this.getMyCharacterPage(0, 20);
    this.getNewestCharacters(0, 20);
  }

  getNewestCharacters(pageNumber: number, pageSize: number) {
    this.characterTemplateService.getCharacters(pageNumber, pageSize)
      .subscribe((res: CharacterPageModel) => {
        this.newestCharacters = res.content;
      });
  }

  getMyCharacterPage(pageNumber: number, pageSize: number) {
    this.characterTemplateService.getCharacters(pageNumber, pageSize)
      .subscribe((res: CharacterPageModel) => {
        this.myCharacters = res.content;
      });
  }

}
