import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matching-view',
  templateUrl: './matching-view.component.html',
  styleUrls: ['./matching-view.component.css']
})
export class MatchingViewComponent implements OnInit {

  // matching nodes should supply nodeData of the following:
  // an array of objects of this format:
  // [{}]
  // id set 1: an array of character strings ("a", "b", "c", "d", ...)
  // id set 2: an array of correct
  // if they are all correct, traverse to next correct node
  // if any answer is incorrect, traverse to a different node?

  constructor() { }

  ngOnInit(): void {
  }

}
