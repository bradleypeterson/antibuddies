import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabHeaderComponent } from './lab-header.component';

describe('LabHeaderComponent', () => {
  let component: LabHeaderComponent;
  let fixture: ComponentFixture<LabHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
