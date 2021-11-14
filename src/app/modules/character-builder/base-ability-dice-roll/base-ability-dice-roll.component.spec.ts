import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAbilityDiceRollComponent } from './base-ability-dice-roll.component';

describe('BaseAbilityDiceRollComponent', () => {
  let component: BaseAbilityDiceRollComponent;
  let fixture: ComponentFixture<BaseAbilityDiceRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseAbilityDiceRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAbilityDiceRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
