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
      this.lab  = this.data.labsContainer.labs[this.labId]
      this.node = this.lab.nodes[this.nodeId]
      console.log(" lab name in quiz node" + this.labId)
     // this.ilab = this.dataService.getLab(this.labId)

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
  @Input() Description: string;

  editNode = false;
  //ilab: ILab  = this.dataService.getLab(0)
  node: Quiznode
  nodes:Quiznode[]=[]
  newAnswer: boolean;
  newAnswerVal: string;
  maxAnswerOptions: number = 5;
  answers: answerClass[]= [];
  selectedOutgoingNode: number = 0;
  outgoingNodes: number[] = [];

  

  Question = ""
  ngOnChanges(): void {
    this.newAnswerVal = this.newAnswerVal;
  }


  populateFields()
  {
      /* vendors contains the element we're looking for */
      
      console.log("ilab nodes contain id" + this.nodeId)
      
      this.Question = this.node.question
      this.answers = this.node.answers
      for(let value of this.answers)
      {
        console.log("answer " + value.answerText + " outgoingnode "+ value.connectingNodeID)
      }

  }
  handleNewAnswer(): void {
    this.newAnswer = true;
  }

  saveNewAnswer(value: string): void {
 
    console.log("this is the answer value when clicked "+ value)
   
    if(this.selectedOutgoingNode==0)
    {
          this.node.createAnswer(value, 1)
    }
    else
    {
      this.node.createAnswer(value, this.selectedOutgoingNode)
    }
    this.answers = this.node.answers
    this.newAnswer = false;
  }

  populateOutgoingNodes(): void 
  {
    // populate component with outgoing node options

    this.nodes= this.lab.nodes
    
    for(let value of this.nodes)
    {this.outgoingNodes.push(value.nodeID)
      console.log("outgoingnode" + value.nodeID)
    }
    
  }




  saveNode(): void 
  {
      this.node.question=this.Question
  }

}
