import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit, OnChanges {

  // list of available node behaviors - fetch from database later
  nodeBehaviors: string[] = ['Matching', 'Play video', 'Perform experiment', 'Question / Answer'];
  nodeType: string;

  /*
  // fetch appropriate node-behavior component based on selected behavior.
  // this represents the part of the node component that changes
  // depending on what the instructor selects as the desired behavior.
  // For example, if the instructor selects "matching", this should
  // load the matching node component into this part of the node component, 
  // or if it is the "play video" option, this should load the video node 
  // component instead.
  */


  constructor() { }
  ngOnChanges(): void {
    this.nodeType = this.nodeType;
  }

  ngOnInit(): void {
    this.nodeType = this.nodeBehaviors[0];
  }

  onClickDesc(): void {
    
  }

}
