import { Component } from '@angular/core';
import { PDFComponent } from './pdfTable/table-components'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-pdftable',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public component: any[] = [
    {
      'content': 'Cuotas',
      'text_color': [30, 107, 184],
      'fill_color': [255, 255, 255],
      'draw_color': [221, 221, 221],
      'text_offset': [10, 10],
      'font_size': 10,
      'x_proportion': 0.08,
      'y_proportion': 0.06,
      'direction': 'x'
    },
    {
      'content': 'Concepto',
      'x_proportion': 0.20
    },
    {
      'content': 'Fecha',
      'x_proportion': 0.20,
    },
    {
      'content': 'Capital',
      'x_proportion': 0.20,
    },
    {
      'content': 'Interés',
      'x_proportion': 0.20,
    },
    {
      'content': 'Total',
      'x_proportion': 0.12,
    }
  ];
}
