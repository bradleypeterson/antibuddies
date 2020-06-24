import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  filters: string[] = ['Most Recent', 'Discipline', 'Level'];
  selectedFilter: string;

  constructor() { }

  ngOnInit(): void {
  }

}
