import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintreepaneComponent } from './admintreepane.component';

describe('AdmintreepaneComponent', () => {
  let component: AdmintreepaneComponent;
  let fixture: ComponentFixture<AdmintreepaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintreepaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintreepaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
