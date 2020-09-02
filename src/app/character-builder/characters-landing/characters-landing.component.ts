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
        this.characters = this.applyRacialModifiersToBaseAbilityScore(res.content);
        this.pageNumber = res.pageable.pageNumber;
        this.pageSize = res.pageable.pageSize;
        this.totalPages = res.totalPages;
      });
  }

  applyRacialModifiersToBaseAbilityScore(characters: Array<CharacterTemplateModel>): Array<CharacterTemplateModel> {
    characters.every(character => {
      switch (true) {
        case !!character.basicAttributes.race.raceBaseAbilityModifiers.STRENGTH: {
          character.baseAbilities.STRENGTH.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.STRENGTH;
          break;
        }
        case !!character.basicAttributes.race.raceBaseAbilityModifiers.DEXTERITY: {
          character.baseAbilities.DEXTERITY.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.DEXTERITY;
          break;
        }
        case !!character.basicAttributes.race.raceBaseAbilityModifiers.CONSTITUTION: {
          character.baseAbilities.CONSTITUTION.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.CONSTITUTION;
          break;
        }
        case !!character.basicAttributes.race.raceBaseAbilityModifiers.WISDOM: {
          character.baseAbilities.WISDOM.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.WISDOM;
          break;
        }
        case !!character.basicAttributes.race.raceBaseAbilityModifiers.INTELLIGENCE: {
          character.baseAbilities.INTELLIGENCE.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.INTELLIGENCE;
          break;
        }
        case !!character.basicAttributes.race.raceBaseAbilityModifiers.CHARISMA: {
          character.baseAbilities.CHARISMA.inherentScore += character.basicAttributes.race.raceBaseAbilityModifiers.CHARISMA;
          break;
        }
        default: {
          return characters;
        }
      }
      return characters;
    });
    return characters;
}
}
