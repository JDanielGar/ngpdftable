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
      '1',
      '2'
      ],
      'proportion': 0.1
    },
    {
      'header': 'Palabra',
      'content': [
        ['Hola',
        'Chao',
        ],
        ['Perra',
        'Zorra',
        'Maldito',
        'Xupelo',
        ]
      ],
      'proportion': 0.7
    },
    {
      'header': 'Puntaje',
      'content': [
        'Iniciacion',
        'Insultos'
      ],
      'proportion': 0.1
    },
    {
      'header': 'Usados',
      'content': [
        ['20', '33'],
        ['  ', '3', '1', '6'],
      ],
      'proportion': 0.1
    }
  ]

  public options = {
    'size': [500, 500],
    'position': [20, 20],
    'font_size': 10,
    'header_height': 20,
    'text_margin': [10, 10]
  }

  ngOnInit() {
    this.pdf = new PdfTable(this.options, this.data)
  }

  public downloadPDF() {
    this.pdf.downloadPDF('puntajes');
  }
}
