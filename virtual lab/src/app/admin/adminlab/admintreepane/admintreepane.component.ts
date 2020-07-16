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

    let treeData = 
      {
        "name": "Top Level",
        "children": [
          { 
            "name": "Level 2: A",
            "children": [
              { "name": "Son of A" },
              { "name": "Daughter of A" }
            ]
          },
          { "name": "Level 2: B" }
        ]
      };

    d3.select('#adminTreePane').append("span")
    .text("Hello, world!");

    // Set the dimensions and margins of the diagram
    let margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    // Append SVG to component
    let svg = d3.select("#adminTreePane").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");
    let i = 0,
      duration = 750,
      root;

    // Set tree map size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, (d: any) => { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;
        

  }

}
