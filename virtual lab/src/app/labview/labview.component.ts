import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'pm-labview',
  templateUrl: './labview.component.html',
  styleUrls: ['./labview.component.css']
})
export class LabviewComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.add('Labview page loaded');
  }

}
