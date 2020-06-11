import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlabComponent } from './adminlab.component';

describe('AdminlabComponent', () => {
  let component: AdminlabComponent;
  let fixture: ComponentFixture<AdminlabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminlabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
