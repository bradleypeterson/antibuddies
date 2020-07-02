import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'student-toolbar',
  templateUrl: './student-toolbar.component.html',
  styleUrls: ['./student-toolbar.component.css']
})
export class StudentToolbarComponent implements OnInit, OnChanges {

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
    /*switch(this.currNodeType) {
      case 'Matching':
        // change UI buttons to accomodate student interaction with this type of node
        break;
      case 'Play video':
        // change UI buttons to accomodate student interaction with this type of node
        break;
      case 'Perform experiment':
        // change UI buttons to accomodate student interaction with this type of node
        break;
      case 'Question / Answer':
        // change UI buttons to accomodate student interaction with this type of node
        break;
      default:
        // default buttons
        break;
    }*/
  }


}
