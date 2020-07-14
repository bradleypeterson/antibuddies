import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingViewComponent } from './matching-view.component';

describe('MatchingViewComponent', () => {
  let component: MatchingViewComponent;
  let fixture: ComponentFixture<MatchingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
