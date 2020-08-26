import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { CharacterTemplateModel } from '../model/character-template-model';
import { CharacterPageModel } from '../model/character-page-model';

@Component({
  selector: 'app-characters-landing',
  templateUrl: './characters-landing.component.html',
  styleUrls: ['./characters-landing.component.css']
})
export class CharactersLandingComponent implements OnInit {

  singleCharacter: CharacterTemplateModel;
  characters: Array<CharacterTemplateModel>;

  resultTest: any;

  constructor(private characterTemplateService: CharacterService) {
  }

  ngOnInit(): void {
    this.getCharacterPage(0, 5);
  }

  getCharacterById(id: number) {
    this.characterTemplateService.getCharacterById(id).subscribe((res: CharacterTemplateModel) => {
      this.singleCharacter = res;
    });
  }

  getCharacterPage(pageNumber: number, pageSize: number) {
    this.characterTemplateService.getCharacters(pageNumber, pageSize)
      .subscribe((res: CharacterPageModel) => {
        this.resultTest = res;
        this.characters = res.content;
        console.log(res);
      });
  }

}
