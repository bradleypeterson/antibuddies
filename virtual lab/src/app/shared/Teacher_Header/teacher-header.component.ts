import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'pm-teacherheader',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.css']
})
export class TeachHeaderComponent {
  title = 'Angular: Getting Started';
  isNewLab: boolean = true;
  labName: string = "";

  labid = "1"

  constructor(private route: ActivatedRoute, 
              private router: Router){}

  addNewLab(): void{
    console.log("clicked on button")
    if(this.labName !="")
    {
      this.router.navigate(['/adminlab', '1', this.labName])
      console.log("clicked on button")
      
    }
  }
}
