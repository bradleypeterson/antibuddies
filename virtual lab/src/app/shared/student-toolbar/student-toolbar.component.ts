import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'student-toolbar',
  templateUrl: './student-toolbar.component.html',
  styleUrls: ['./student-toolbar.component.css']
})
export class StudentToolbarComponent implements OnInit, OnChanges {

  currNodeType: string = ''

  constructor() { }

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
