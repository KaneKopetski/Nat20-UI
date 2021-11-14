import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildBasicsFormComponent } from './build-basics-form.component';

describe('BuildBasicsFormComponent', () => {
  let component: BuildBasicsFormComponent;
  let fixture: ComponentFixture<BuildBasicsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildBasicsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildBasicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
