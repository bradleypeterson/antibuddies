import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { TeachHeaderComponent } from './shared/Teacher_Header/teacher-header.component';
import { LabListComponent } from './Lab-List/lab-list.component';
import { TreeNodeComponent } from './admin/adminlab/nodes/tree-node/tree-node.component';
import { QuizNodeComponent } from './admin/adminlab/nodes/quiz-node/quiz-node.component';
import { MatchingNodeComponent } from './admin/adminlab/nodes/matching-node/matching-node.component';
import { ExperimentNodeComponent } from './admin/adminlab/nodes/experiment-node/experiment-node.component';
import { VideoNodeComponent } from './admin/adminlab/nodes/video-node/video-node.component';
import { AdminlabComponent } from './admin/adminlab/adminlab.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { AdmintreepaneComponent } from './admin/adminlab/admintreepane/admintreepane.component';
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LabviewComponent } from './labview/labview.component';

@NgModule({
  declarations: [
    AppComponent,
    TeachHeaderComponent,
    LabListComponent,
    TreeNodeComponent,
    MatchingNodeComponent,
    VideoNodeComponent,
    ExperimentNodeComponent,
    QuizNodeComponent,
    AdminlabComponent,
    AnalyticsComponent,
    AdmintreepaneComponent,
    HeaderComponent,
    LabviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
