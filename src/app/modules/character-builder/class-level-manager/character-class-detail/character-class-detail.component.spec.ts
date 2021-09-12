import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterClassDetailComponent } from './character-class-detail.component';

describe('CharacterClassDetailComponent', () => {
  let component: CharacterClassDetailComponent;
  let fixture: ComponentFixture<CharacterClassDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterClassDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
