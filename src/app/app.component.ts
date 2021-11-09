import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { slideInAnimation } from './core/animations/app.animation';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppButton } from './core/components/header/app-button-model';
import {StyleRenderer, ThemeVariables, lyl, WithStyles} from '@alyle/ui';

const STYLES = (theme: ThemeVariables) => ({
  $global: lyl `{
    body {
      background-color: ${theme.background.default}
      color: ${theme.text.default}
      font-family: ${theme.typography.fontFamily}
      margin: 0
      direction: ${theme.direction}
    }
  }`,
  root: lyl `{
    display: block
  }`
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
  providers: [StyleRenderer]
})
export class AppComponent implements OnInit, OnDestroy, WithStyles {
  title = 'Nat20';
  private mediaSubscription: Subscription;
  public deviceXs: boolean;
  public deviceSm: boolean;
  public deviceMd: boolean;
  public deviceLg: boolean;
  sideNavItems: AppButton[];
  readonly classes = this.sRenderer.renderSheet(STYLES, true);


  constructor(private mediaObserver: MediaObserver,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              readonly sRenderer: StyleRenderer) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('d20', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/d20.svg'));
    this.mediaSubscription = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs';
      this.deviceSm = result.mqAlias === 'sm';
      this.deviceMd = result.mqAlias === 'md';
      this.deviceLg = result.mqAlias === 'lg';
      console.log(result.mqAlias);
    });

    // TODO: replace with itmes returned by a service
    this.sideNavItems = [
      {name: 'My Characters', iconUrl: 'assets/medieval.svg', iconClass: 'characterLight', iconName: 'medieval', route: ''},
      {name: 'My Campaigns', iconUrl: 'assets/alchemy.svg', iconClass: 'alchemyLight', iconName: 'alchemy', route: ''},
      {name: 'My Items', iconUrl: 'assets/hammer.svg', iconClass: 'anvilLight', iconName: 'hammer', route: ''}
    ];

    this.sideNavItems.forEach(app => {
      this.matIconRegistry.addSvgIcon(app.iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(app.iconUrl));
    });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }
}
