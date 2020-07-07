import { Component, OnInit } from '@angular/core';
import { BackEndServiceService } from '../../back-end-service.service';
import { MessageService } from '../../message.service';
//import { labType, quizNode } from '../../interfaces';

@Component({
  selector: 'student-lab',
  templateUrl: './student-lab.component.html',
  styleUrls: ['./student-lab.component.css']
})
export class StudentLabComponent implements OnInit {

  isBegin: boolean = false;
  currentNode: number = 0;
  nextNode: number;
  prevNode: number;
  disabledNext: string = "disabled";
  disabledPrevious: string = "disabled";
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
        },
        {
          nodeId: 1,
          nodeType: 'quiz',
          question: "What is the answer to this second question here?",
          answers: [
            // populate with dummy answers
            {
              answerId: 0,
              nextNodeId: 5,
              answerText: "Follow me to the end!",
            },
            {
              answerId: 1,
              nextNodeId: 6,
              answerText: "This second option is correct"
            },
            {
              answerId: 2,
              nextNodeId: 7,
              answerText: "This third option is the right one"
            }
          ]
        },
        {
          nodeId: 2,
          nodeType: 'quiz',
          question: "This is the third question (nodeId: 2)",
          answers: [
            // populate with dummy answers
            {
              answerId: 0,
              nextNodeId: 8,
              answerText: "cupcakes",
            },
            {
              answerId: 1,
              nextNodeId: 9,
              answerText: "rainbows"
            },
            {
              answerId: 2,
              nextNodeId: 10,
              answerText: "sprinkles"
            },
            {
              answerId: 3,
              nextNodeId: 11,
              answerText: "butterflies"
            }
          ]
        },
        {
          nodeId: 3,
          nodeType: 'quiz',
          question: "This is the fourth question (nodeId: 3)",
          answers: [
            // populate with dummy answers
            {
              answerId: 0,
              nextNodeId: 12,
              answerText: "Fourth node answer 1",
            },
            {
              answerId: 1,
              nextNodeId: 13,
              answerText: "Another dummy answer for you"
            },
            {
              answerId: 2,
              nextNodeId: 14,
              answerText: "Pick me!"
            },
            {
              answerId: 3,
              nextNodeId: 15,
              answerText: "Arbitrary nonsense"
            }
          ]
        },
        {
          nodeId: 5,
          nodeType: 'quiz',
          question: "Quick, answer this final question! (nodeId: 5)",
          answers: [
            // populate with dummy answers
            {
              answerId: 0,
              nextNodeId: 16,
              answerText: "Click me and be done with the lab already!!",
            },
            {
              answerId: 1,
              nextNodeId: 17,
              answerText: "This second option is correct"
            },
            {
              answerId: 2,
              nextNodeId: 18,
              answerText: "This third option is the right one"
            }
          ]
        },
      ]
  };
  
  // Actual lab for use later
  //newLab: labType;

  constructor(private backEnd: BackEndServiceService, private messages: MessageService) { 
    // Retrieve lab from service - test
    // this.newLab = backEnd.getLabID(0);
  }

  ngOnInit(): void {
    this.messages.add('Student labview page loaded');
  }

  handleBegin(): void {
    this.isBegin = true;
  }

  getNextIndex(next: number): number {
    // returns array index of node with specific ID
    // console.log("getNextIndex: index of next node: ", this.dummyLab.nodes.findIndex((element) => element.nodeId === next))
    return this.dummyLab.nodes.findIndex((element) => element.nodeId === next)
  }

  goNextNode(next: number): void {
    // check that node exists before allowing traversal
    if (this.getNextIndex(next) !== -1) {
      this.nextNode = this.getNextIndex(next);
      this.disabledNext = "";
    } else {
      this.disabledNext = "disabled";
    }
  }

  // method to handle forward tree traversal
  handleTraverseForward(): void {
    this.prevNode = this.currentNode;
    this.currentNode = this.nextNode;
    this.disabledNext = "disabled";
    this.disabledPrevious = "";
  }

  // method to handle backward tree traversal --
  // currently this will only work for one node, since having multiple
  // previous nodes stored would require a structure (like an array)
  // to store the previous nodes for traversal. Currently
  // it is only a variable with a single value.
  handleTraverseBackward(): void {
    // this.prevNode
    this.currentNode = this.prevNode;
    this.disabledNext = "";
    this.disabledPrevious = "disabled";
  }

}
