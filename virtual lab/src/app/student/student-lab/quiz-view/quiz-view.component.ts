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
    nodeId: 0,
    question: '',
    answers: []
  };
  @Output() answered: EventEmitter<number> = new EventEmitter<number>();
  nextNodeAsSelected: number;

  // everything in nodeData obj will be passed in from parent component
  // nodeData = {
  //   nodeId: 0,
  //       question: "What is the answer to this question?",
  //       answers: [
  //         // populate with dummy answers
  //         {
  //           nextNodeId: 1,
  //           answerText: "This first option is correct",
  //         },
  //         {
  //           nextNodeId: 2,
  //           answerText: "This second option is correct"
  //         },
  //         {
  //           nextNodeId: 3,
  //           answerText: "This third option is the right one"
  //         },
  //         {
  //           nextNodeId: 4,
  //           answerText: "This final option is correct"
  //         }
  //       ]
  // }

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.nodeData)
  }

  ngOnChanges(): void {
    this.nodeData = this.nodeData
  }

  determineNextNode(nextNodeAsSelected: number) {
    // pass event back to parent/toolbar, traverse to next node
    
    this.answered.emit(this.nextNodeAsSelected);
  }

}
