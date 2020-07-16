import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-nodelist',
  templateUrl: './nodelist.component.html',
  styleUrls: ['./nodelist.component.css']
})
export class NodelistComponent implements OnInit {

  constructor() { }
  @Output() nodeIdEvent = new EventEmitter<number>();
  ngOnInit(): void {
  }

  nodeId = 1;
  editNode(): void {

    this.nodeIdEvent.emit(this.nodeId)
  }


  nodes =
    [
        {

          "nodeid": "1",
          "description": "Immune cells",
          "name": "Question1"
         
        },
        {
          "nodeid": "2",
          "description": "BloodTypes",
          "name": "Question2"
            
        },
        {
          "nodeid": "3",
          "description": "White Blood Cell ",
          "name": "Question3"
        },
        {
          "nodeid": "4",
          "description": "Blood Type O and B",
          "name": "Question4"
        },
        {
          "nodeid": "5",
          "description": "Immune reactions",
          "name": "Question5",
        },
        {
          "nodeid": "6",
          "description": "Immune Defences",
          "name": "Question6",
        }
    ]
}
