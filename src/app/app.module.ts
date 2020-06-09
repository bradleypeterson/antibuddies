import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { ProductListComponent } from './products/product-list.component';
import { TeachHeaderComponent } from './Teacher_Header/teacher-header.component';
import { LabListComponent } from './Lab-List/lab-list.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { QuizNodeComponent } from './quiz-node/quiz-node.component';
import { MatchingNodeComponent } from './matching-node/matching-node.component';
import { ExperimentNodeComponent } from './experiment-node/experiment-node.component';
import { VideoNodeComponent } from './video-node/video-node.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TeachHeaderComponent,
    LabListComponent,
    TreeNodeComponent,
    MatchingNodeComponent,
    VideoNodeComponent,
    ExperimentNodeComponent,
    QuizNodeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
