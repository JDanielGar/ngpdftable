import { Component, OnInit } from '@angular/core';
import { PdfTable } from './pdfTable/table-class'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public pdf: any;
  public data = [
    {
      'header': 'Item',
      'content': [
      '1'
      ],
      'proportion': 0.1
    },
    {
      'header': 'Diseño',
      'content': [
        'Arquitectonico',
        'Diseño de Espacios',
      ],
      'proportion': 0.8
    },
    {
      'header': 'Puntaje',
      'content': [
        '23',
        '43',
      ],
      'proportion': 0.1
    }
  ]

  public options = {
    'size': [500, 300],
    'position': [50, 10],
    'font_size': 10
  }

  ngOnInit() {
    this.pdf = new PdfTable(this.options, this.data)
  }

  public downloadPDF() {
    this.pdf.downloadPDF('puntajes');
  }
}
