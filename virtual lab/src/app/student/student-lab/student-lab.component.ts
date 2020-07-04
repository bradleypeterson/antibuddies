import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'student-lab',
  templateUrl: './student-lab.component.html',
  styleUrls: ['./student-lab.component.css']
})
export class StudentLabComponent implements OnInit {

  isBegin: boolean = false;

  dummyLab = {
    // dummy lab - labId, name, description, publishDate, course,
    // nodes array
    labId: 0,
    name: "Lab #1: First Student Lab",
    description: 
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum 
    posuere urna nec tincidunt praesent. Orci ac auctor augue mauris augue neque. 
    Sit amet commodo nulla facilisi. Blandit cursus risus at ultrices mi tempus. 
    Eu nisl nunc mi ipsum faucibus vitae aliquet. Viverra aliquet eget sit amet 
    tellus cras adipiscing enim. Nulla aliquet porttitor lacus luctus accumsan 
    tortor posuere ac. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim 
    cras tincidunt. Tellus cras adipiscing enim eu. Gravida quis blandit turpis 
    cursus in hac habitasse. Maecenas pharetra convallis posuere morbi leo urna.`,
    publishDate: new Date(),
    course: "Immunohematology",
    nodes: [
      // populate with dummy quiz nodes - nodeId, question content,
      // answers array

      // will later be populated from service, populate child component quiz-view
      {
        nodeId: 0,
        nodeType: 'quiz',
        question: "What is the answer to this question?",
        answers: [
          // populate with dummy answers
          {
            nextNodeId: 1,
            answerText: "This first option is correct",
          },
          {
            nextNodeId: 2,
            answerText: "This second option is correct"
          },
          {
            nextNodeId: 3,
            answerText: "This third option is the right one"
          },
          {
            nextNodeId: 4,
            answerText: "This final option is correct"
          }
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleBegin(): void {
    this.isBegin = true
  }

  // function to handle future node traversal functionality
  handleTraverse(): void {

  }

}
