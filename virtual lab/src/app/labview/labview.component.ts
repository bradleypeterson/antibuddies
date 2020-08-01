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

  labId =  Math.floor(Math.random() * 200) + 1 
  ilabs: ILab[]=[]
  labs: lab[] =[]
  isAdmin = 1
  invalidInput = false;

  constructor(private dataService: DataServiceService, private route: ActivatedRoute, 
              private router: Router, private backendService: BackEndServiceService,  private messageService: MessageService){
              //   let labNumber = this.backendService.labsContainer.findLabByName("Chemistry");
              // let lab = this.backendService.labsContainer.labs[labNumber];
              // this.labs = this.labs.concat(lab)

                this.ilabs = dataService.getLabs();
                this.labs = this.backendService.labsContainer.labs

              }

  addNewLab(): void{
    console.log("clicked on button")
    
      if(this.name !="")
      {
        this.invalidInput=false
        this.router.navigate(['/adminlab', this.labId, this.name])
        console.log("clicked on button")
        
      }
      else{this.invalidInput=true}
  }
  ngOnInit(): void {
    this.messageService.add('Labview page loaded');
    for (let lab of this.labs) {
            
    }
  }

}
