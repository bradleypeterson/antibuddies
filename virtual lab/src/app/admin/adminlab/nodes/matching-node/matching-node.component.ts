import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matching-node',
  templateUrl: './matching-node.component.html',
  styleUrls: ['./matching-node.component.css']
})
export class MatchingNodeComponent implements OnInit {

  keys = ["key1", "key2"];
  values = ["value1", "value2"];

  constructor() { }

  ngOnInit(): void {
  }

  addKey(element) {
    this.keys.push(element.value);
    console.log(this.keys);
  } 

  addValue(element) {
    this.values.push(element);
  }

}