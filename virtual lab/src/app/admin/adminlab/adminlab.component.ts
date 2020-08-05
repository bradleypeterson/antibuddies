import { Component, OnInit, Output } from '@angular/core';
import { MessageService } from '../../message.service';
import { BackEndServiceService } from '../../back-end-service.service';
import { isNullOrUndefined } from 'util';
import { lab, Quiznode } from 'src/app/interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ILab } from 'src/app/labview/interfaces/labInterface';
import {  DataServiceService} from "src/app/data-service.service";
import { Node } from '../../labview/interfaces/NodeInterface';
import {  ModalComponent} from "../../modal/modal.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'pm-adminlab',
  templateUrl: './adminlab.component.html',
  styleUrls: ['./adminlab.component.css']
})
export class AdminlabComponent implements OnInit {

  constructor(public matDialog: MatDialog, private messageService: MessageService, private dataService: DataServiceService, private router: Router, private route: ActivatedRoute, private data: BackEndServiceService) { 
    
  
  }

  

  ngOnInit(): void {
    this.messageService.add('Admin page loaded');

    // console.log("before lab",this.data.labsContainer);
    

     this.labId  = +this.route.snapshot.paramMap.get('labid')
     this.labName  = this.route.snapshot.paramMap.get('name')
    // console.log(" this lab name is " ,this.labName)
    // this.nodeType = this.nodeBehaviors[0];
    // //example
    // let lab = this.data.labsContainer.createLab(this.labName)
    // lab.description = "spring 2020 chemistry"
    // let quiz = lab.createQuizNode("what is blah blah blah")
    // quiz.createAnswer("blah 1",0)
    // quiz.createAnswer("blah 2",0)
    // quiz.createAnswer("blah 3",0)
    // quiz.createAnswer("blah 4",0)
   
    // this.ilab = this.dataService.getLab(this.labID)
   
     this.editLab()
 
   
    
    //example pull nodes from chemistry
    // console.log("pull nodes from chemistry:",
    // this.data.labsContainer.labs[this.data.labsContainer.findLabByName("Chemistry")].nodes)

    // //another example, getting answers from the above in chemistry, and its quiz node:
    // let labCon = this.data.labsContainer
    // let la = labCon.labs[labCon.findLabByName("Chemistry")]
    // let node = la.nodes[la.findNodeByName("what is blah blah blah")]
    // let answers = node.answers
   // console.log ("pull answers created above:",answers)

    //console.log("after lab",this.data.labsContainer);



    //another example, getting answers from the above in chemistry, and its quiz node:
    // let labCon = this.data.labsContainer
    // let la = labCon.labs[labCon.findLabByName("Chemistry")]
    // let node = la.nodes[la.findNodeByName("what is blah blah blah")]
    // let answers = node.answers
    // console.log ("pull answers created above:",answers)
  }
  nodeBehaviors: string[] = ['Matching', 'Play video', 'Perform experiment', 'Question / Answer'];
  editlab = false;
  isNewLab = true;
  isNewNode = true;
  labName = "";
  nodeName = "";
  labId= 0
  nodeId = 0
  nodes: Node[] =[]
  invalidInput = false;
  lab: lab
  Description = ""
  quiznode: Quiznode


  openModal() : void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
   
  }
  receiveMessage($event): void 
  {
    this.isNewLab = $event
  }

  //when a lab link is clicked or when a lab is created
  editLab(): void
  {
    this.lab = this.data.labsContainer.labs[this.labId]
    this.labId = this.lab.labID
    this.labName = this.lab.name

  }
  nodeNameMessage($event): void 
  {
    this.nodeName = $event
  }

  nodeIdMessage($event): void
  {
    this.nodeId = $event
    console.log("node Id  event", this.nodeId)
    this.isNewNode =false
    
  }
  labDetails(): void{

  }

  saveLab(): void{

  }

  deleteLab(): void{
    
    this.openModal()
  }


  nodeType: string;
 
  ngOnChanges(): void {
    this.nodeType = this.nodeType;
   
  }

  //back button returns to labview page
  backButton(): void{
  
    this.router.navigate(['/labview'])
  }
 
 

  //adds a new node 
  addNewNode(): void {
    
    if(this.nodeName != "")
    {
      this.invalidInput = false;
      this.quiznode = this.lab.createQuizNode(this.nodeName)
      this.quiznode.question = ""
      this.quiznode.description = this.Description
      this.nodeId = this.quiznode.nodeID
      console.log("quiz node id from admin when adding new node:"+ this.quiznode.nodeID+"nameid: "+ this.quiznode.name)
  
      
      this.isNewNode= false;
      
    }
    else{
      this.invalidInput = true
    }
  }

  saveDescription (): void{
      this.quiznode.description = this.Description
  }
  nodeBackButton(): void{
    this.isNewNode = true;
  }


}
