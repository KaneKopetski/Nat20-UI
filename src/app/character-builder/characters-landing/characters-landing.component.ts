import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { CharacterTemplateModel } from '../model/character-template-model';
import { CharacterPageModel } from '../model/character-page-model';
import apply = Reflect.apply;

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
        this.characters = this.applyRacialModifiersToBaseAbilityScore(res.content);
        console.log(res);
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
