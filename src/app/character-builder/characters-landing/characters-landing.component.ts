import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { CharacterPageModel } from '../model/character-page-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-characters-landing',
  templateUrl: './characters-landing.component.html',
  styleUrls: ['./characters-landing.component.css']
})
export class CharactersLandingComponent implements OnInit {

  characterPage: CharacterPageModel;
  position = new FormControl('above');
  pageSize: number;
  pageNumber: number;

  constructor(private characterTemplateService: CharacterService) {
  }

  ngOnInit(): void {
    this.getCharacterPage(0, 20);
  }

  getCharacterPage(pageNumber: number, pageSize: number) {
    this.characterTemplateService.getCharacters(pageNumber, pageSize)
      .subscribe((res: CharacterPageModel) => {
        this.characterPage = res;
        this.pageNumber = res.pageable.pageNumber;
        this.pageSize = res.pageable.pageSize;
      });
  }
}
