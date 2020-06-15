import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabviewComponent } from './labview.component';

describe('LabviewComponent', () => {
  let component: LabviewComponent;
  let fixture: ComponentFixture<LabviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
