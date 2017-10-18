import { Component, Input, OnInit } from '@angular/core';
import { PDFComponent } from '../../pdfTable/table-components';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ng-pdf-table',
    templateUrl: './pdf.component.html'
})
export class PDFTableComponent implements OnInit {
    @Input('component') component: any[];
    @Input('dimensions') dimensions: any[];

    private pdf: any;

    ngOnInit() {
        this.pdf.setTable()
    }

    public downloadPDF() {
        this.pdf = new PDFComponent(this.component);
    }
}
