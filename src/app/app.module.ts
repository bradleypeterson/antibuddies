import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { TeachHeaderComponent } from './home/Teacher_Header/teacher-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TeachHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
