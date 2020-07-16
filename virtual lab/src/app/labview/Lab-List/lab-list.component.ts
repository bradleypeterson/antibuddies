import { Component, OnInit } from "@angular/core";
import { BackEndServiceService } from '../../back-end-service.service';

@Component ({
    selector: 'pm-lablist',
    templateUrl: './lab-list.component.html'
})

export class LabListComponent implements OnInit {

    labs: Object[] = [];

    constructor( private backendService: BackEndServiceService ) {
        let labNew = this.backendService.labsContainer.createLab("Chemistry")
        labNew.description = "spring 2020 chemistry"
        let quiz = labNew.createQuizNode("what is blah blah blah")
        quiz.createAnswer("blah 1",0)
        quiz.createAnswer("blah 2",0)
        quiz.createAnswer("blah 3",0)
        quiz.createAnswer("blah 4",0)


        let labNumber = this.backendService.labsContainer.findLabByName("Chemistry");
        let lab = this.backendService.labsContainer.labs[labNumber];
        this.labs.push(lab)
    }

    ngOnInit(): void {
        console.log(this.labs)

        for (let lab of this.labs) {
            
        }
    }

    // labs =
    // [
    //     {

    //       "labname": "Module 1:Basic Antibodies",
    //       "description": "Learning the basic of antibodies of the immune system",
    //       "size": "2MB",
    //       "date": "March 19, 2019",
    //       "class": "Immunohematology"
         
    //     },
    //     {
    //         "labname": "Module 3: Chemical reactions",
    //         "description": "You will be mixing a bunch of reactions",
    //         "size": "3MB",
    //         "date": "March 10, 2019",
    //         "class": "Chemistry Lab"
    //     },
    //     {
    //         "labname": "Module 4: Nuclear Chemistry",
    //         "description": "Learning about atomic reactions",
    //         "size": "2MB",
    //         "date": "April 19, 2019",
    //         "class": "Chemistry Lab"
    //     },
    //     {
    //         "labname": "Module 1: Fluid dynamics",
    //         "description": "You will be learning about fluid machenics",
    //         "size": "2MB",
    //         "date": "March 25, 2019",
    //         "class": "Physics Lab"
    //     },
    //     {
    //         "labname": "Module 2: ABO dicrepency",
    //         "description": "learning about different blood types",
    //         "size": "2MB",
    //         "date": "June 5, 2019",
    //         "class": "Immunohematology"
    //     },
    //     {
    //         "labname": "Module 3: Advance Antibodies",
    //         "description": "You will be learning advance antibodies of the immune system",
    //         "size": "2MB",
    //         "date": "June 6, 2019",
    //         "class": "Immunohematology"
    //     }
    // ]
}