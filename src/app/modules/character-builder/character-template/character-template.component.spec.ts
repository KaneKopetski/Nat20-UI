import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTemplateComponent } from './character-template.component';

describe('CharacterTemplateComponent', () => {
  let component: CharacterTemplateComponent;
  let fixture: ComponentFixture<CharacterTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
