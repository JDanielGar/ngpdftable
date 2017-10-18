import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Modules
import { PDFTableModule } from './components/pdfcomponent/pdf.module';

@NgModule({
  declarations: [
    AppComponent,
    PDFTableModule
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    PDFTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
