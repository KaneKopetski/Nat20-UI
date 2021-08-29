import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';

@NgModule({
  declarations: [
    CharacterBuilderComponent
  ],
  imports: [
    SharedModule,
    CarouselModule
  ]
})
export class CharacterBuilderModule { }
