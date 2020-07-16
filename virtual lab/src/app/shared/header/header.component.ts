import { Component, OnInit, OnChanges, Input , EventEmitter, Output} from '@angular/core';
import { MessageService } from '../../message.service';
import { BackEndServiceService } from '../../back-end-service.service';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  isNewLab: boolean = true;
  labName: string = "";

  @Output() isNewLabEvent = new EventEmitter<boolean>();
  @Output() labNameEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }

  addNewLab(): void{
    if(this.labName !="")
    {
      if(this.isNewLab = true)
      {
        this.isNewLab = false;
      }
      else
      {
        this.isNewLab = true;
      }
      console.log("clicked on button")
      this.isNewLabEvent.emit(this.isNewLab)
      this.labNameEvent.emit(this.labName)
    }
  }

}
