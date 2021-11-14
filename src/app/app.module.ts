import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/modules/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './core/interceptors/token-interceptor/token-interceptor.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/modules/authentication/auth.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { CharacterBuilderModule } from './modules/character-builder/character-builder.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAnalyticsModule,
        CoreModule,
        AuthModule,
        UserProfileModule,
        CharacterBuilderModule,
        SharedModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
