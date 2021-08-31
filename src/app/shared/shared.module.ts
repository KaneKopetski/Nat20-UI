import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialElevationDirective } from './directives/material-elevation.directive';
import { PreventDoubleClickDirective } from './directives/prevent-double-click.directive';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MaterialElevationDirective,
    PreventDoubleClickDirective
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    ToastrModule,
    ToastContainerModule,
    HttpClientModule,
    MaterialElevationDirective,
    PreventDoubleClickDirective
  ]
})
export class SharedModule { }
