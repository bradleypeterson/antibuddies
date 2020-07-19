import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {

  // data from an individual node should be loaded from the parent 
  // student-lab component (as an @input()) into this node sub-component 
  // for the student to view. Their recorded response to the
  // question should be passed back (using @event()) to the parent
  // to determine which node they will traverse to next.
  @Input() nodeData = {
    nodeID: 0,  
    answers: [],
    name: '',
  };
  @Output() answered: EventEmitter<number> = new EventEmitter<number>();
  nextNodeAsSelected: number;

  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.nodeData)
  }

  ngOnChanges(): void {
  }

  determineNextNode(nextNodeAsSelected: number) {
    // pass event back to parent/toolbar, traverse to next node
    this.answered.emit(this.nextNodeAsSelected);
    console.log("next node:", this.nextNodeAsSelected);
    this.resetNext();
  }

  resetNext(): void {
    this.nextNodeAsSelected = null;
  }

}
