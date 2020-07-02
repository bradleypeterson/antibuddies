import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment-node',
  templateUrl: './experiment-node.component.html',
  styleUrls: ['./experiment-node.component.css']
})
export class ExperimentNodeComponent implements OnInit {

  newExpObject: boolean;
  maxExpObjects: number = 6;
  expObjects: object[] = [];

  constructor() { 
    this.newExpObject = false;
  }

  handleNewObject(): void {
    this.newExpObject = true;
  }

  ngOnInit(): void {
  }

}
