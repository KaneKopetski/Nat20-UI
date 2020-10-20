import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTemplateListComponent } from './character-template-list.component';

describe('CharacterTemplateListComponent', () => {
  let component: CharacterTemplateListComponent;
  let fixture: ComponentFixture<CharacterTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
