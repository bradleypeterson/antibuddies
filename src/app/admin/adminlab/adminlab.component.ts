import { Component, OnInit } from '@angular/core';
import { MessageService } from "../../message.service";
import { BackEndServiceService } from "../../back-end-service.service"

@Component({
  selector: 'pm-adminlab',
  templateUrl: './adminlab.component.html',
  styleUrls: ['./adminlab.component.css']
})
export class AdminlabComponent implements OnInit {

  constructor(private messageService: MessageService, private backendservice: BackEndServiceService) { }
  //getTestData

  stringArray: string[];
  
  getDataFromService(): void {
    this.backendservice.getTestData()
      .subscribe(sampleString => this.stringArray = sampleString );
  }


  ngOnInit(): void {
    this.messageService.add("Admin page loaded");
    this.getDataFromService();
  }

}
