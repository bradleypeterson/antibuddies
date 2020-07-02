import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'student-toolbar',
  templateUrl: './student-toolbar.component.html',
  styleUrls: ['./student-toolbar.component.css']
})
export class StudentToolbarComponent implements OnInit, OnChanges {

// current node type should be passed in from parent

// student toolbar should listen for changes in quiz-view
// so that the next node button is no longer greyed out,
// allow for traversal to the next node

  currNodeType: string = 'Play video';

  constructor() { }

  handlePreviousNode(): void {
    // go to previous node -- load previous node view
    console.log("Go to prev node");
  }

  handleNextNode(): void {
    // go to next node -- load next node view
    console.log("Go to next node");
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
