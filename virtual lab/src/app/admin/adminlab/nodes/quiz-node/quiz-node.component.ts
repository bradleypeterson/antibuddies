import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FileUploader } from '../../../../shared/file-uploader/file-uploader.component';
import { BackEndServiceService } from '../../../../back-end-service.service';
import { MessageService } from '../../../../message.service';
import { lab } from 'src/app/interfaces';
import { Quiznode } from 'src/app/interfaces';
import { answerClass } from 'src/app/interfaces';
import { Node } from '../../../../labview/interfaces/NodeInterface';
import { Answer } from '../../../../labview/interfaces/AnswerInterface';
import {  DataServiceService} from "src/app/data-service.service";
import { ILab } from 'src/app/labview/interfaces/labInterface';
@Component({
  selector: 'quiz-node',
  templateUrl: './quiz-node.component.html',
  styleUrls: ['./quiz-node.component.css']
})
export class QuizNodeComponent implements OnInit {

  

 imgFileTypes: string = 'image/png, image/jpg, image/jpeg';


 

  constructor(private messageService: MessageService, private dataService: DataServiceService, private data: BackEndServiceService) { this.newAnswer = false}

  ngOnInit(): void {
   

    //let lab = this.data.labsContainer.createLab("Chemistry")
    // lab.description = "spring 2020 chemistry"
    // let quiz = lab.createQuizNode("what is blah blah blah")
    // quiz.createAnswer("blah 1",0)
    // quiz.createAnswer("blah 2",0)
    // quiz.createAnswer("blah 3",0)
    // quiz.createAnswer("blah 4",0)

    //example pull nodes from chemistry
    // console.log("pull nodes from chemistry:",
      this.lab  = this.data.labsContainer.labs[this.data.labsContainer.findLabByName(this.labName)]
      console.log(" lab name in quiz node" + this.labId)
      this.ilab = this.dataService.getLab(this.labId)
      console.log(this.ilab.labDescription)
      console.log(this.dataService.getLabs().length)
      console.log(this.dataService.getLabs().values.toString)
      this.populateFields();
      this.populateOutgoingNodes();
      console.log("nodeId " +this.nodeId)
    //another example, getting answers from the above in chemistry, and its quiz node:
    // let labCon = this.data.labsContainer
    // let la = labCon.labs[labCon.findLabByName("Chemistry")]
    // let node = la.nodes[la.findNodeByName("what is blah blah blah")]
    // let answers = node.answers
    console.log(" lab name in quiz node" + this.labId)
  }
  lab: lab
  @Input() labName: string;
  @Input() nodeName: string;
  @Input() labId: number;
  @Input() nodeId: number;

  editNode = false;
  ilab: ILab  = this.dataService.getLab(0)
  nodes: Node[] =[]
  newAnswer: boolean;
  newAnswerVal: string;
  maxAnswerOptions: number = 5;
  answers: Answer[]= [];
  selectedOutgoingNode: number = 0;
  outgoingNodes: number[] = [];

  Question = ""
  ngOnChanges(): void {
    this.newAnswerVal = this.newAnswerVal;
  }


  populateFields()
  {
    if (this.ilab.nodes.some(e => e.nodeId === this.nodeId)) {
      /* vendors contains the element we're looking for */
      this.editNode =true;
      console.log("ilab nodes contain id" + this.nodeId)
      let node = this.ilab.nodes.find(e => e.nodeId === this.nodeId)
      this.Question = node.Question
      this.answers = node.answers
      for(let value of this.answers)
      {
        console.log("answer " + value.answer + " outgoingnode "+ value.outGoingNodeID)
      }
 
    }
    else
    {
      this.editNode = false
      console.log("ilab nodes dont contain id ")
    }
  }
  handleNewAnswer(): void {
    this.newAnswer = true;
  }

  saveNewAnswer(value: string): void {
    let answer:Answer
    if(this.selectedOutgoingNode==0)
    {
      answer ={
        answer: value,
        outGoingNodeID: 1
    }
  }
  else
  {
     answer ={
      answer: value,
      outGoingNodeID: this.selectedOutgoingNode
    }
  }
    this.answers.push(answer);

    this.newAnswer = false;
  }

  populateOutgoingNodes(): void {
    // populate component with outgoing node options
    console.log(this.ilab.labDescription)
    let node = this.ilab.nodes
    
    
    for(let value of node)
    {this.outgoingNodes.push(value.nodeId)
      console.log("outgoingnode" + value.nodeId)
    }
    
  }




  saveNode(): void {

    if(!this.editNode)
    {
      let defaultOutgoingNode: number[] = []
      let node: Node ={
      nodeId: this.nodeId,
      description: "Node description",
      name: this.nodeName,
      Question: this.Question,
      answers: this.answers,
      incomingNodes: defaultOutgoingNode}
    
      this.ilab.nodes.push(node)
    }
    else
    {
      let node = this.ilab.nodes.find(e => e.nodeId === this.nodeId)
      let index = this.ilab.nodes.indexOf(node);
      console.log("index of node "+ index)
      this.ilab.nodes[index].Question=this.Question
      this.ilab.nodes[index].answers=this.answers
      
    }
    
  }

}
