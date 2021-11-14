import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAbilityGeneratorComponent } from './base-ability-generator.component';

describe('BaseAbilityGeneratorComponent', () => {
  let component: BaseAbilityGeneratorComponent;
  let fixture: ComponentFixture<BaseAbilityGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseAbilityGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAbilityGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
