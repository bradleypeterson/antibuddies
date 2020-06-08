import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentNodeComponent } from './experiment-node.component';

describe('ExperimentNodeComponent', () => {
  let component: ExperimentNodeComponent;
  let fixture: ComponentFixture<ExperimentNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
