import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlabComponent } from './admin/adminlab/adminlab.component';
import { LabviewComponent } from './labview/labview.component';
import { StudentLabComponent } from './student/student-lab/student-lab.component'

const routes: Routes = [
  { path: 'adminlab', component: AdminlabComponent },
  { path: 'labview', component: LabviewComponent},
  { path: 'studentlab', component: StudentLabComponent },
  { path: '', redirectTo: '/labview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }