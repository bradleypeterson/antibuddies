import { Component, OnInit, OnChanges } from '@angular/core';
import { FileUploader } from '../../../../shared/file-uploader/file-uploader.component';

@Component({
  selector: 'app-quiz-node',
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

  constructor() { 
    this.newAnswer = false;
  }

  ngOnInit(): void {
    this.populateOutgoingNodes();
  }

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
