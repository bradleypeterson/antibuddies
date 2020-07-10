import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'pm-admintreepane',
  templateUrl: './admintreepane.component.html',
  styleUrls: ['./admintreepane.component.css']
})
export class AdmintreepaneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    d3.select('section').append("span")
    .text("Hello, world!");
  }

}
