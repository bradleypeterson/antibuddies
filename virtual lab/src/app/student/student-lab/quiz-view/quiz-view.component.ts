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

  // student-toolbar is passed data from student-lab that is first
  // passed into student lab from this component. (child -> parent -> other child)
  // For example, when an answer choice leads to another node,
  // and it is selected by the user, that selection is passed to student-lab
  // and then to the student-toolbar to enable traversal to the next node.
  // (The button in the toolbar will no longer be disabled/greyed out).

  // @input() data
  @Input() nodeData = {
    nodeID: 0,  
    answers: [],
    name: '',
  };

  // emitted data (passed to student-lab (parent))
  @Output() answered: EventEmitter<number> = new EventEmitter<number>();
  nodeAsSelected: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.resetNext();
  }

  determineNextNode(nextNodeAsSelected: number) {
    // pass event back to parent/toolbar, traverse to next node
    this.answered.emit(this.nodeData.answers[this.nodeAsSelected].connectingNodeID);
    // console.log("next node:", this.nodeData.answers[this.nodeAsSelected].connectingNodeID);
  }

  // function to reset an answer selection from a revisited (previous) node
  resetNext(): void {
    this.nodeAsSelected = null;
  }

}
