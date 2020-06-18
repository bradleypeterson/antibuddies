import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { VideoNodeComponent } from './video-node/video-node.component';
import { MatchingNodeComponent } from './matching-node/matching-node.component';
import { ExperimentNodeComponent } from './experiment-node/experiment-node.component';
import { QuizNodeComponent } from './quiz-node/quiz-node.component';
import { FileUploader } from './shared/file-uploader/file-uploader.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TreeNodeComponent,
    VideoNodeComponent,
    MatchingNodeComponent,
    ExperimentNodeComponent,
    QuizNodeComponent,
    FileUploader,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
