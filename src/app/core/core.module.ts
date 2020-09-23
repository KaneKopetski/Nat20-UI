import {NgModule, SkipSelf, Optional} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/header/toolbar.component';
import { PageNotFoundComponent } from './components/error-components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WelcomeComponent,
    PageNotFoundComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    BrowserAnimationsModule,
    ToolbarComponent
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
