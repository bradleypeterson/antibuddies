import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template:
  `<div><h1>{{pageTitle}}</h1>
     <pm-teacherheader></pm-teacherheader>
     <pm-lablist></pm-lablist>
    </div>`
})
export class AppComponent {
  pageTitle: string = 'Welcome to Virtual Labs';
}
