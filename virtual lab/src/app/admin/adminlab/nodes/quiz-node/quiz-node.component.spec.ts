import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNodeComponent } from './quiz-node.component';

describe('QuizNodeComponent', () => {
  let component: QuizNodeComponent;
  let fixture: ComponentFixture<QuizNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
