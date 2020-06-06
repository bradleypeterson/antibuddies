import { Component } from "@angular/core";

@Component ({
    selector: 'pm-lablist',
    templateUrl: './lab-list.component.html'
})

export class LabListComponent {

    labs: any[]=
    [
        {

          "labname": "Module 1:Basic Antibodies",
          "description": "Learning the basic of antibodies of the immune system",
          "size": "2MB",
          "date": "March 19, 2019",
          "class": "Immunohematology"
         
        },
        {
            "labname": "Module 3: Chemical reactions",
            "description": "You will be mixing a bunch of reactions",
            "size": "3MB",
            "date": "March 10, 2019",
            "class": "Chemistry Lab"
        },
        {
            "labname": "Module 4: Nuclear Chemistry",
            "description": "Learning about atomic reactions",
            "size": "2MB",
            "date": "April 19, 2019",
            "class": "Chemistry Lab"
        },
        {
            "labname": "Module 1: Fluid dynamics",
            "description": "You will be learning about fluid machenics",
            "size": "2MB",
            "date": "March 25, 2019",
            "class": "Physics Lab"
        },
        {
            "labname": "Module 2: ABO dicrepency",
            "description": "learning about different blood types",
            "size": "2MB",
            "date": "June 5, 2019",
            "class": "Immunohematology"
        },
        {
            "labname": "Module 3: Advance Antibodies",
            "description": "You will be learning advance antibodies of the immune system",
            "size": "2MB",
            "date": "June 6, 2019",
            "class": "Immunohematology"
        }
    ]
}