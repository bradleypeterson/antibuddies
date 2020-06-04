import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  // list of available node behaviors - fetch from database later
  nodeBehaviors: String[] = ['Matching', 'Play video', 'Perform experiment', 'Question / Answer'];

  // available behavior nodes
  // behaviorNodes = [
  //   {
  //     name: 'Matching',

  //     subComponents: []
  //   }
  // ]

  /*
  // fetch appropriate node-behavior component based on selected behavior.
  // this represents the part of the node component that changes
  // depending on what the instructor selects as the desired behavior.
  // For example, if the instructor selects "matching", this should
  // load the matching node component into this part of the node component, 
  // or if it is the "play video" option, this should load the video node 
  // component instead.
  */


  // Two approaches - create component for every behavior (not scalable)
  // fetchBehaviorNode(nodeType) {
    // return component based on type, using interpolation
    // `app-${nodeType}-node`
  // }

  // or, fetch one generic behavior component that can be passed required elements?


  constructor() { }

  ngOnInit(): void {
  }

}
