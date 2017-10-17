import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PDFTableComponent } from './components/pdfcomponent/pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    PDFTableComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
