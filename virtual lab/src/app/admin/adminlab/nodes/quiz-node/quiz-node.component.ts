import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FileUploader } from '../../../../shared/file-uploader/file-uploader.component';
import { BackEndServiceService } from '../../../../back-end-service.service';
import { MessageService } from '../../../../message.service';
import { lab } from 'src/app/interfaces';

@Component({
  selector: 'quiz-node',
  templateUrl: './quiz-node.component.html',
  styleUrls: ['./quiz-node.component.css']
})
export class QuizNodeComponent implements OnInit {

  newAnswer: boolean;
  newAnswerVal: string;
  maxAnswerOptions: number = 5;
  answerOptions = [];
  selectedOutgoingNode: number = 0;
  outgoingNodes: number[] = [];
  imgFileTypes: string = 'image/png, image/jpg, image/jpeg';

 

  constructor(private messageService: MessageService, private data: BackEndServiceService) { this.newAnswer = false}

  ngOnInit(): void {
    this.populateOutgoingNodes();

    //let lab = this.data.labsContainer.createLab("Chemistry")
    // lab.description = "spring 2020 chemistry"
    // let quiz = lab.createQuizNode("what is blah blah blah")
    // quiz.createAnswer("blah 1",0)
    // quiz.createAnswer("blah 2",0)
    // quiz.createAnswer("blah 3",0)
    // quiz.createAnswer("blah 4",0)

    //example pull nodes from chemistry
    // console.log("pull nodes from chemistry:",
      this.lab  = this.data.labsContainer.labs[this.data.labsContainer.findLabByName(this.labName)]

    // //another example, getting answers from the above in chemistry, and its quiz node:
    // let labCon = this.data.labsContainer
    // let la = labCon.labs[labCon.findLabByName("Chemistry")]
    // let node = la.nodes[la.findNodeByName("what is blah blah blah")]
    // let answers = node.answers
  }
  lab: lab
  @Input() labName: string;
  @Input() nodeName: string;
  ngOnChanges(): void {
    this.newAnswerVal = this.newAnswerVal;
  }


  
  handleNewAnswer(): void {
    this.newAnswer = true;
  }

  saveNewAnswer(answer: string): void {
    this.answerOptions.push(answer);

    this.newAnswer = false;
  }

  populateOutgoingNodes(): void {
    // populate component with outgoing node options
  }

}
