import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSummaryComponent } from './build-summary.component';

describe('BuildSummaryComponent', () => {
  let component: BuildSummaryComponent;
  let fixture: ComponentFixture<BuildSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
