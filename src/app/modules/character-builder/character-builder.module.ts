import { NgModule } from '@angular/core';
import { CharactersLandingComponent } from './characters-landing/characters-landing.component';
import { SharedModule } from '../../shared/shared.module';
import { CharacterTemplateListComponent } from './character-template-list/character-template-list.component';



@NgModule({
  declarations: [
    CharactersLandingComponent,
    CharacterTemplateListComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CharacterBuilderModule { }
