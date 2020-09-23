import { NgModule } from '@angular/core';
import { CharactersLandingComponent } from './characters-landing/characters-landing.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CharactersLandingComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CharacterBuilderModule { }
