import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { ClassLevelManagerComponent } from './class-level-manager/class-level-manager/class-level-manager.component';
import { CharacterClassDetailComponent } from './class-level-manager/character-class-detail/character-class-detail.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BaseAbilityDiceRollComponent} from "./base-ability-dice-roll/base-ability-dice-roll.component";
import {BuildSummaryComponent} from "./build-summary/build-summary.component";
import { SourceFormComponent } from './source-form/source-form.component';
import { BuildBasicsFormComponent } from './build-basics-form/build-basics-form.component';

@NgModule({
  declarations: [
    CharacterBuilderComponent,
    ClassLevelManagerComponent,
    CharacterClassDetailComponent,
    BaseAbilityDiceRollComponent,
    BuildSummaryComponent,
    SourceFormComponent,
    BuildBasicsFormComponent
  ],
  imports: [
    SharedModule,
    CarouselModule,
    DragDropModule
  ]
})
export class CharacterBuilderModule { }
