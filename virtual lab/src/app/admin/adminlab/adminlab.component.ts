import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { BackEndServiceService } from '../../back-end-service.service';
import { isNullOrUndefined } from 'util';
import { lab } from 'src/app/interfaces';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'pm-adminlab',
  templateUrl: './adminlab.component.html',
  styleUrls: ['./adminlab.component.css']
})
export class AdminlabComponent implements OnInit {

  constructor(private messageService: MessageService, private router: Router, private route: ActivatedRoute, private data: BackEndServiceService) { 
    
  }

  

  ngOnInit(): void {
    this.messageService.add('Admin page loaded');

    console.log("before lab",this.data.labsContainer);
    

    // this.labId  = +this.route.snapshot.paramMap.get('labid')
    // this.labName  = this.route.snapshot.paramMap.get('labname')
    // console.log(" this lab name is " ,this.labName)

    //example
    // let lab = this.data.labsContainer.createLab("Chemistry")
    // lab.description = "spring 2020 chemistry"
    // let quiz = lab.createQuizNode("what is blah blah blah")
    // quiz.createAnswer("blah 1",0)
    // quiz.createAnswer("blah 2",0)
    // quiz.createAnswer("blah 3",0)
    // quiz.createAnswer("blah 4",0)
  

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
  labId = 0;
  isNewLab = true;
  isNewNode = true;
  labName = "";
  nodeName = "";
  nodeId = 0;
  receiveMessage($event): void 
  {
    this.isNewLab = $event
  }

  nodeIdMessage($event): void
  {
    this.nodeId = $event
    console.log("node Id ", this.nodeId)
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

  }

  backButton(): void{
  
    this.router.navigate(['/labview'])
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
