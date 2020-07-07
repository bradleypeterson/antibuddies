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

    console.log("before lab",this.data.labsContainer);
    
    let lab = this.data.labsContainer.createLab("Chemistry")
    lab.description = "spring 2020 chemistry"
    let quiz = lab.createQuizNode("what is blah blah blah")
    quiz.createAnswer("blah 1",0)
    quiz.createAnswer("blah 2",0)
    quiz.createAnswer("blah 3",0)
    quiz.createAnswer("blah 4",0)

    console.log("pull nodes for chemistry:",
    this.data.labsContainer.labs[this.data.labsContainer.findLabByName("Chemistry")].nodes)

    console.log("after lab",this.data.labsContainer);

  }

}
