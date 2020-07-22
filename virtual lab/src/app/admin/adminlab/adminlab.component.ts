import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { BackEndServiceService } from '../../back-end-service.service';
import { isNullOrUndefined } from 'util';
import { lab } from 'src/app/interfaces';
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
     this.labName  = this.route.snapshot.paramMap.get('labname')
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
   
    this.ilab = this.dataService.getLab(this.labId)
    if(typeof this.ilab == "undefined")
   {
    console.log("created new lab")
     this.createNewLab()
     
   }
   else
   {
    console.log("edited lab ")
     this.editLab()
 
   }
    
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
  labId = 0
  ilab: ILab
  nodeId = 0
  nodes: Node[] =[]
  invalidInput = false;

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

  createNewLab(): void
  {
    this.ilab=
              {
                labId: this.labId,
                labName: this.labName,
                labDescription: "basic description of a lab",
                publishDate: new Date(),
                course: "hemotology",
                nodeCount: 3,
                nodes: this.nodes
              }
              console.log("lab id adminlab "+ this.ilab.labId)
              this.dataService.setLab(this.ilab)
  }
  editLab(): void
  {
    
    this.labId = this.ilab.labId
    this.labName = this.ilab.labName

  }
  nodeNameMessage($event): void 
  {
    this.nodeName = $event
  }

  nodeIdMessage($event): void
  {
    this.nodeId = $event
    console.log("node Id  event", this.nodeId)
    if(this.nodeId!=0)
    {
      this.isNewNode =false
    }
  }
  labDetails(): void{

  }

  saveLab(): void{

  }

  deleteLab(): void{
    this.openModal()
  }

  onClickDesc(): void {
    
  }
  nodeType: string;
 
  ngOnChanges(): void {
    this.nodeType = this.nodeType;
   
  }

  backButton(): void{
  
    this.router.navigate(['/labview'])
  }
 
  addNewNode(): void {
   
    if(this.nodeName != "")
    {
      this.invalidInput = false;
        if(this.isNewNode == true)
        {
          this.nodeId = Math.floor(Math.random() * 200) + 1 
          this.isNewNode = false;
        }
        else{this.isNewNode = true;}
    }
    else{
      this.invalidInput = true
    }

    
  }

 
  nodeBackButton(): void{
    this.isNewNode = true;
  }


}
