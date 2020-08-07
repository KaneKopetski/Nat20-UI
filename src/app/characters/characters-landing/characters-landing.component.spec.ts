import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersLandingComponent } from './characters-landing.component';

describe('CharactersLandingComponent', () => {
  let component: CharactersLandingComponent;
  let fixture: ComponentFixture<CharactersLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
