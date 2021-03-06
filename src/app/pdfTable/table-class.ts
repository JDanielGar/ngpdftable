import * as jsPDF from 'jspdf';
import { TableOptions } from '../models/options';

// Options = {
//     'size':{
//         'width': number,
//         'height': number
//     }
//     'position': {
//         'x': position,
//         'y': position
//     },
//     'header': [],
//     'data': []
// }

export class PdfTable {
    public pdf = new jsPDF('1', 'pt', 'a4')
    private options: TableOptions;
    private data: any;

    constructor(options: TableOptions, data: any = []) {
        this.options = options;
        this.data = data;
        this.pdf.setFontSize(options.font_size)
        this.setTable()
    }
 // Set the data in the Grid
    private setTable(): void {
        const positions: any = [this.options.position[0], 20];
        const proportion = 0.1;
        for (const column of this.data) {
            // TODO. There is the Proportion.
            this.pdf.text(positions[0],
                positions[1],
                column.header);
            this.pdf.rect(positions[0],
                this.options.position[1],
                this.options.size[0] * column.proportion,
                20)
            for (const row of column.content) {
                // if (Array.isArray(row)) {
                //     console.log('Perra')
                // } else {
                positions[1] += 20;
                this.pdf.text(positions[0],
                    positions[1] + 8,
                    row)
                this.pdf.rect(positions[0],
                    positions[1],
                    this.options.size[0] * column.proportion + positions[0],
                    positions[1]);
                // }
            }
            positions[0] += this.options.size[0] * column.proportion;
            positions[1] = 20 // HEIGHT
        }
    }
    // private getProportion(column, items, width): Float32Array{
    // }
    public downloadPDF(name: string) {
        this.pdf.save(name)
    }
}
