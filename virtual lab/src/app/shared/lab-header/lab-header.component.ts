import { Component, OnInit ,OnChanges, Input , EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pm-lab-header',
  templateUrl: './lab-header.component.html',
  styleUrls: ['./lab-header.component.css']
})
export class LabHeaderComponent implements OnInit {

  constructor() { }
  isBack: boolean = true;
  @Input() labName: string;
  @Output() isBackEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  labDetails(): void{

  }

  saveLab(): void{

  }

  deleteLab(): void{

  }

  backButton(): void{
   
     
      this.isBack = true;
    
      console.log("clicked on button")
      this.isBackEvent.emit(this.isBack)
    
  }
}
