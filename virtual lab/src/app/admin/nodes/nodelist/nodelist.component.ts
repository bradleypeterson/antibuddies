import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackEndServiceService } from '../../../back-end-service.service';
import { LabColor } from 'd3';
import { Node } from '../../../labview/interfaces/NodeInterface';
import { ILab } from '../../../labview/interfaces/labInterface';
import { lab } from 'src/app/interfaces';
import {  DataServiceService} from "src/app/data-service.service";

@Component({
  selector: 'pm-nodelist',
  templateUrl: './nodelist.component.html',
  styleUrls: ['./nodelist.component.css']
})
export class NodelistComponent implements OnInit {

  constructor(private data: BackEndServiceService, private dataService: DataServiceService) { }
  @Output() nodeIdEvent = new EventEmitter<number>();
  @Output() nodeNameEvent = new EventEmitter<string>();
  ngOnInit(): void {
    //this.lab  = this.data.labsContainer.labs[this.data.labsContainer.findLabByName(this.labName)]
    //this.nodes = this.lab.nodes
    this.ilab = this.dataService.getLab(this.labId)
    console.log("lab id "+this.labId)
    console.log(this.ilab.labDescription)
    this.nodes =this.ilab.nodes
    console.log(this.labName)
    console.log(this.nodes.length)
  }

  nodes: Node[] = []
  lab: lab
  ilab: ILab
  @Input() labName: string;
  @Input() labId: number;
  
  editNode(nodeId: number, nodeName: string): void {

    console.log("nodeId edit " + nodeId + " nodename Edit"+ nodeName)
  
    this.nodeIdEvent.emit(nodeId)
    this.nodeNameEvent.emit(nodeName)
  }

}

