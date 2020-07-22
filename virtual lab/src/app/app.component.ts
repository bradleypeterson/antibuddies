import { Component } from '@angular/core';
import {  DataServiceService} from "./data-service.service";
import {  ModalComponent} from "./modal/modal.component";


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle: string = 'Virtual Labs';
  constructor(private dataservice: DataServiceService) { }
  
}
