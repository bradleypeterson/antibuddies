import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLabComponent } from './student-lab.component';

describe('StudentLabComponent', () => {
  let component: StudentLabComponent;
  let fixture: ComponentFixture<StudentLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
