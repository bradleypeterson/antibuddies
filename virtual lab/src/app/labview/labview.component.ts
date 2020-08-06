import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BackEndServiceService } from '../back-end-service.service';
import { DataServiceService } from "src/app/data-service.service";
import { ILab } from './interfaces/labInterface';
import { tree } from 'd3';
import { lab } from 'src/app/interfaces';


@Component({
  selector: 'pm-labview',
  templateUrl: './labview.component.html',
  styleUrls: ['./labview.component.css']
})
export class LabviewComponent implements OnInit {


  title = 'Angular: Getting Started';
  isNewLab: boolean = true;
  name: string = "";
  description: string = "";
  course: string =  "";

 
  labs: lab[] =[]
  lab: lab
  isAdmin = 1
  invalidInputName = false;
  invalidInputDescription = false;
  invalidInputCourse = false;

  constructor(private dataService: DataServiceService, private route: ActivatedRoute, 
              private router: Router, private backendService: BackEndServiceService,  private messageService: MessageService){
          
                this.labs = this.backendService.labsContainer.labs

              }

  addNewLab(): void{
    console.log("clicked on button")
    
      
      if(this.name =="")
      {
        this.invalidInputName=true
      }
      else {this.invalidInputName=false}
      if(this.description =="")
      {
        this.invalidInputDescription = true;
      }
      else {this.invalidInputDescription = false;}
      if(this.course == "")
      {
        this.invalidInputCourse = true;
      }
      else{this.invalidInputCourse = false;}
  
  
      if(this.invalidInputDescription == false &&
        this.invalidInputCourse == false && 
        this.invalidInputName == false)
      {

        this.lab = this.backendService.labsContainer.createLab(this.name);
        this.lab.description = this.description;
        this.lab.course = this.course;
        console.log("this lab index"+ this.lab.labID)


        this.router.navigate(['/adminlab', this.lab.labID, this.name])
        console.log("clicked on button")
      }
  }

  
  ngOnInit(): void {
    this.messageService.add('Labview page loaded');
    for (let lab of this.labs) {
            
    }
  }

}
