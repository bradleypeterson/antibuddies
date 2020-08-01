import { Component, OnInit, OnChanges } from '@angular/core';
import { BackEndServiceService } from '../../back-end-service.service';
import { MessageService } from '../../message.service';
import { LabsContainer, Quiznode, lab } from '../../interfaces';

@Component({
  selector: 'student-lab',
  templateUrl: './student-lab.component.html',
  styleUrls: ['./student-lab.component.css']
})

export class StudentLabComponent implements OnInit {

  labName: string;
  labDescription: string;
  isBegin: boolean = false; // check if student has begun lab
  isFinal: boolean = false; // check if final answer selected before allowing finish of lab
  isFinished: boolean = false;
  currentNode: number = 0;  // track current node
  nextNode: number;         // track next node
  prevNode: number;         // track previous node
  disabledNext: string = "disabled";      // set buttons to disabled (in child component: student-toolbar)
  disabledPrevious: string = "disabled";
  finalNode: number;
  nodes: Quiznode[];        // the array of nodes (load from respective lab in constructor)

  constructor(private data: BackEndServiceService, private messages: MessageService) { 
    // Retrieve lab from service - test
    let labNumber = this.data.labsContainer.findLabByName("Chemistry");
    let lab = this.data.labsContainer.labs[labNumber];
    this.labName = lab.name;
    this.labDescription = lab.description;
    this.nodes = lab.nodes;
    this.finalNode = lab.findNodeByName("Here is the final question. What is the answer?");

    // TODO: load in lab as determined by labview lab link click
    // set labNumber to the lab that is passed in
    // ex: labNumber = this.data.labsContainer.findLabByName(*labNameVariable*)
  }

  ngOnInit(): void {
    // this.messages.add('Student labview page loaded');
  }

  ngOnChanges(): void {
  }

  handleBegin(): void {
    // Student begins lab, hiding start button, descriptive information
    this.isBegin = true;
  }

  getNextIndex(next: number): number {
    // returns array index of node with specific ID
    // console.log("getNextIndex: index of next node: ", this.dummyLab.nodes.findIndex((element) => element.nodeId === next))
    return this.nodes.findIndex((element) => element.nodeID === next)
  }

  // determines whether a node traverses to another based on how user selects answer.
  goNextNode(next: number): void {
    this.nextNode = next
    // if they are on the final node, view ending screen when button pressed
    if (this.currentNode === this.finalNode) {
      this.isFinal = true;
      this.disabledNext = "";
      return;
    }

    this.isFinal = false;

    // check that node exists before allowing traversal
    if (this.getNextIndex(next) !== -1) {
      this.nextNode = this.getNextIndex(next);
      this.disabledNext = "";
    } else {
      this.disabledNext = "disabled";
    }
  }

  // method to handle forward tree traversal
  handleTraverseForward(): void {
    this.prevNode = this.currentNode;
    this.currentNode = this.nextNode;
    this.disabledNext = "disabled";
    this.disabledPrevious = "";
  }

  // method to handle backward tree traversal --
  // currently this will only work for one node, since having multiple
  // previous nodes stored would require a structure (like an array).
  // it is only a variable with a single value. (This way a student
  // is also challenged more appropriately).
  handleTraverseBackward(): void {
    // this.prevNode
    this.nextNode = null;
    console.log(this.nextNode)
    this.currentNode = this.prevNode;
    this.disabledNext = "disabled";
    this.disabledPrevious = "disabled";
    this.isFinal = false;
  }

  // when the lab is completed, show end card to student.
  handleLabEnd(): void {
    this.isFinished = true;
  }

}
