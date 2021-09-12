import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { ClassLevelManagerComponent } from './class-level-manager/class-level-manager/class-level-manager.component';
import { CharacterClassDetailComponent } from './class-level-manager/character-class-detail/character-class-detail.component';

@NgModule({
  declarations: [
    CharacterBuilderComponent,
    ClassLevelManagerComponent,
    CharacterClassDetailComponent
  ],
  imports: [
    SharedModule,
    CarouselModule
  ]
})
export class CharacterBuilderModule { }
