import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'student-toolbar',
  templateUrl: './student-toolbar.component.html',
  styleUrls: ['./student-toolbar.component.css']
})
export class StudentToolbarComponent implements OnInit, OnChanges {

// student toolbar should listen for changes in quiz-view
// so that the next node button is no longer greyed out,
// allow for traversal to the next node
@Input() isFinished: boolean;
@Input() allowNext: string;
@Input() allowPrevious: string;
@Output() traverseForwardIsOkay: EventEmitter<Boolean> = new EventEmitter<Boolean>();
@Output() traverseBackwardIsOkay: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  currNodeType: string = 'Play video';

  constructor() { }

  handlePreviousNode(): void {
    // go to previous node -- load previous node view
    console.log("Go to prev node");
    this.traverseBackwardIsOkay.emit(true);
  }

  handleNextNode(): void {
    // go to next node -- load next node view
    console.log("Go to next node");
    this.traverseForwardIsOkay.emit(true);

  }

  handlePlayPause(): void {
    // trigger pause/play video
    console.log("Toggle play/pause of video");
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }


}
