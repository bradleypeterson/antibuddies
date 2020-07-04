import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { BackEndServiceService } from '../../back-end-service.service';

@Component({
  selector: 'pm-adminlab',
  templateUrl: './adminlab.component.html',
  styleUrls: ['./adminlab.component.css']
})
export class AdminlabComponent implements OnInit {

  constructor(private messageService: MessageService, private data: BackEndServiceService) { }

  ngOnInit(): void {
    this.messageService.add('Admin page loaded');
    let lab = this.data.createLab("chemistry","this is for chemistry part 1");
    let quizNode = this.data.createQuizNode(lab.labID,"section 1",
      "elements",
      "what is the element of whatever")
    console.log("lab",lab);

  }

}
