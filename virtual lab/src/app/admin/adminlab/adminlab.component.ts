import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { BackEndServiceService } from '../../back-end-service.service';
import { isNullOrUndefined } from 'util';
import { lab } from 'src/app/interfaces';

@Component({
  selector: 'pm-adminlab',
  templateUrl: './adminlab.component.html',
  styleUrls: ['./adminlab.component.css']
})
export class AdminlabComponent implements OnInit {

  constructor(private messageService: MessageService, private data: BackEndServiceService) { 
    
  }

  

  ngOnInit(): void {
    this.messageService.add('Admin page loaded');

    console.log("before lab",this.data.labsContainer);
    
    //example
    let lab = this.data.labsContainer.createLab("Chemistry")
    lab.description = "spring 2020 chemistry"
    let quiz = lab.createQuizNode("what is blah blah blah")
    quiz.createAnswer("blah 1",0)
    quiz.createAnswer("blah 2",0)
    quiz.createAnswer("blah 3",0)
    quiz.createAnswer("blah 4",0)
  

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
    let labCon = this.data.labsContainer
    let la = labCon.labs[labCon.findLabByName("Chemistry")]
    let node = la.nodes[la.findNodeByName("what is blah blah blah")]
    let answers = node.answers
    console.log ("pull answers created above:",answers)
  }
  isNewLab = true;
  isNewNode = true;
  labName = "";
  nodeName = "";
  receiveMessage($event): void 
  {
    this.isNewLab = $event
  }

  receiveMessage2($event): void 
  {
    this.isNewLab = $event
    this.isNewNode = $event
  }
   lab: lab

  receiveLabName($event)
  {
    this.labName = $event

    this.lab = this.data.labsContainer.createLab($event)
    this.lab.description = "Lab Description: "+$event;

  }
  
  addNewNode(): void {
    

    if(this.nodeName != "")
    {
        if(this.isNewNode == true)
        {
          this.isNewNode = false;
        }
        else{this.isNewNode = true;}
    }
    
  }

  saveNode(): void{
    this.isNewNode = true;
  }


}
