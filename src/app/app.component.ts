import { Component, OnInit } from '@angular/core';
import { PdfTable } from './pdfTable/table-class'
import { PDFComponent } from './pdfTable/table-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public pdf: any;
  public component: any[] = [
    {
      'content': 'Cuotas',
      'text_color': [30, 107, 184],
      'fill_color': [255, 255, 255],
      'draw_color': [221, 221, 221],
      'text_offset': [10, 10],
      'font_size': 10,
      'x_proportion': 0.08,
      'y_proportion': 0.1,
      'direction': 'x'
    },
    {
      'content': 'Concepto',   
      'x_proportion': 0.20,      
    },
    {
      'content': 'Fecha',
    },
    {
      'content': 'Capital',
    },
    {
      'content': 'Interés',
    },
    {
      'content': 'Total',
      'x_proportion': 0.12,
    }
  ];

  ngOnInit() {
    this.pdf = new PDFComponent(this.component);
    // Position, Size
    this.pdf.setTable([0, 0], [595, 842])
  }
  public downloadPDF() {
    this.pdf.downloadPDF('PDFComponent');
  }
}
