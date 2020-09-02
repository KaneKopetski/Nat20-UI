import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { CharacterPageModel } from '../model/character-page-model';
import { FormControl } from '@angular/forms';
import {CharacterTemplateModel} from '../model/character-template-model';

@Component({
  selector: 'app-characters-landing',
  templateUrl: './characters-landing.component.html',
  styleUrls: ['./characters-landing.component.css']
})
export class CharactersLandingComponent implements OnInit {

  characters: Array<CharacterTemplateModel>;
  res: any;
  position = new FormControl('above');
  pageSize: number;
  pageNumber: number;
  totalPages: number;

  constructor(private characterTemplateService: CharacterService) {
  }

  ngOnInit(): void {
    this.getCharacterPage(0, 20);
  }

  getCharacterPage(pageNumber: number, pageSize: number) {
    this.characterTemplateService.getCharacters(pageNumber, pageSize)
      .subscribe((res: CharacterPageModel) => {
        this.characters = res.content;
        this.res = res;
        this.pageNumber = res.pageable.pageNumber;
        this.pageSize = res.pageable.pageSize;
        this.totalPages = res.totalPages;
      });
  }
}
