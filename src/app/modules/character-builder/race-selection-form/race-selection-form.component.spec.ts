import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceSelectionFormComponent } from './race-selection-form.component';

describe('RaceSelectionFormComponent', () => {
  let component: RaceSelectionFormComponent;
  let fixture: ComponentFixture<RaceSelectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceSelectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
