import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { slideInAnimation } from './core/animations/app.animation';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppButton } from './core/components/header/app-button-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Nat20';
  private mediaSubscription: Subscription;
  public deviceXs: boolean;
  public deviceSm: boolean;
  public deviceMd: boolean;
  public deviceLg: boolean;
  sideNavItems: AppButton[];

  constructor(private mediaObserver: MediaObserver,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
