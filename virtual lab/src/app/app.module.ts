import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from "ng2-charts";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { TreeNodeComponent } from './admin/adminlab/nodes/tree-node/tree-node.component';
import { QuizNodeComponent } from './admin/adminlab/nodes/quiz-node/quiz-node.component';
import { MatchingNodeComponent } from './admin/adminlab/nodes/matching-node/matching-node.component';
import { ExperimentNodeComponent } from './admin/adminlab/nodes/experiment-node/experiment-node.component';
import { VideoNodeComponent } from './admin/adminlab/nodes/video-node/video-node.component';
import { AdminlabComponent } from './admin/adminlab/adminlab.component';
import { AnalyticsComponent } from './admin/adminlab/analytics/analytics.component';
import { AdmintreepaneComponent } from './admin/adminlab/admintreepane/admintreepane.component';
import { AppRoutingModule } from './app-routing.module';
import { LabviewComponent } from './labview/labview.component';
import { FileUploader } from './shared/file-uploader/file-uploader.component';
import { MessagesComponent } from './messages/messages.component';
import { StudentToolbarComponent } from './student/student-lab/student-toolbar/student-toolbar.component';
import { StudentLabComponent } from './student/student-lab/student-lab.component';
import { QuizViewComponent } from './student/student-lab/quiz-view/quiz-view.component';

import {HttpClientModule} from '@angular/common/http';
import { NodelistComponent } from './admin/nodes/nodelist/nodelist.component';
import { MatchingViewComponent } from './student/student-lab/matching-view/matching-view.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    TreeNodeComponent,
    MatchingNodeComponent,
    VideoNodeComponent,
    ExperimentNodeComponent,
    QuizNodeComponent,
    AdminlabComponent,
    AnalyticsComponent,
    AdmintreepaneComponent,
    LabviewComponent,
    FileUploader,
    MessagesComponent,
    StudentToolbarComponent,
    StudentLabComponent,
    QuizViewComponent,
    NodelistComponent,
    MatchingViewComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDialogModule
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
