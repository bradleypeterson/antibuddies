import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincurrentnodeComponent } from './admincurrentnode.component';

describe('AdmincurrentnodeComponent', () => {
  let component: AdmincurrentnodeComponent;
  let fixture: ComponentFixture<AdmincurrentnodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincurrentnodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincurrentnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
