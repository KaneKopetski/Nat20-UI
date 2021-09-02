import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { ClassLevelManagerComponent } from './class-level-manager/class-level-manager/class-level-manager.component';

@NgModule({
  declarations: [
    CharacterBuilderComponent,
    ClassLevelManagerComponent
  ],
  imports: [
    SharedModule,
    CarouselModule
  ]
})
export class CharacterBuilderModule { }
