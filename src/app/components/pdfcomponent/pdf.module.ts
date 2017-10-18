import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PDFTableComponent } from './pdf.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PDFTableComponent],
  exports: [PDFTableComponent]
})
export class PDFTableModule { }
