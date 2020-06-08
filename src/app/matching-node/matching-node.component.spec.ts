import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingNodeComponent } from './matching-node.component';

describe('MatchingNodeComponent', () => {
  let component: MatchingNodeComponent;
  let fixture: ComponentFixture<MatchingNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
