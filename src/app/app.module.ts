import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { TeachHeaderComponent } from './Teacher_Header/teacher-header.component';
import { LabListComponent } from './Lab-List/lab-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TeachHeaderComponent,
    LabListComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
