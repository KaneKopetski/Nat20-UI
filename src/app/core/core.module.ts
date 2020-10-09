import {NgModule, SkipSelf, Optional} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/header/toolbar.component';
import { PageNotFoundComponent } from './components/error-components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';
import { SharedModule } from '../shared/shared.module';
import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { LyTheme2, StyleRenderer, LY_THEME, LY_THEME_NAME, LyHammerGestureConfig } from '@alyle/ui';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { MinimaLight, MinimaDark, MinimaDeepDark } from '@alyle/ui/themes/minima';
import {LySliderModule} from '@alyle/ui/slider';


@NgModule({
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    LyImageCropperModule,
    LySliderModule,

  ],
  exports: [
    BrowserAnimationsModule,
    ToolbarComponent
  ], providers: [
    [ LyTheme2 ],
    [ StyleRenderer ],
    { provide: LY_THEME_NAME, useValue: 'minima-dark' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    { provide: LY_THEME, useClass: MinimaDeepDark, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
