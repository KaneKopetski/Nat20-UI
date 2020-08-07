import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSwitchComponent } from './action-switch.component';

describe('ActionSwitchComponent', () => {
  let component: ActionSwitchComponent;
  let fixture: ComponentFixture<ActionSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
