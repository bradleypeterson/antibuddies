import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'pm-adminlab',
  templateUrl: './adminlab.component.html',
  styleUrls: ['./adminlab.component.css']
})
export class AdminlabComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.add('Admin page loaded');
  }

}
