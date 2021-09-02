import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLevelManagerComponent } from './class-level-manager.component';

describe('ClassLevelManagerComponent', () => {
  let component: ClassLevelManagerComponent;
  let fixture: ComponentFixture<ClassLevelManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLevelManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLevelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
