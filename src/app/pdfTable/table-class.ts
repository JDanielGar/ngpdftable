import * as jsPDF from 'jspdf';
import { TableOptions } from '../models/options';

// Data Variable = [
//     {
//       'header': 'Item',
//       'content': ['1', '2']
//       'proportion': 0.1
//     }
// }

// Table Options = {
//     'size': [x, y],
//     'position': [x, y],
//     'font_size': number,
//     'header_height': number,
//     'text_margin': [x, y]
//   }
// }

export class PdfTable {
    public pdf = new jsPDF('1', 'pt', 'a4')
    private options: TableOptions;
    private data: any;
    private proportions: any[] = [];

    constructor(options: TableOptions, data: any = []) {
        this.options = options;
        this.data = data;
        this.pdf.setFontSize(options.font_size)
        this.getProportions();
        this.setTable()
    }
 // Set the data in the Grid
    private setTable(): void {
        // tslint:disable-next-line:no-debugger
        const positions: any = [this.options.position[0], this.options.position[1]];
        // const proportion = 0.1; Proporcion necesaria.
        for (const column in this.data) {
            // TODO. There is the Proportion.
            this.pdf.text(positions[0] + this.options.text_margin[0],
                positions[1] + this.options.text_margin[1],
                this.data[column].header);
            this.pdf.rect(positions[0],
                positions[1],
                this.options.size[0] * this.data[column].proportion,
                this.options.header_height)
            positions[1] += this.options.header_height;
            for (const row in this.data[column].content) {
                if (Array.isArray(this.data[column].content[row])) {
                    for (const secondary_row of this.data[column].content[row]) {
                        this.pdf.text(positions[0] + this.options.text_margin[0],
                            positions[1] + this.options.text_margin[1],
                            secondary_row);
                            this.pdf.rect(positions[0],
                                positions[1],
                            this.options.size[0] * this.data[column].proportion,
                                (this.options.size[1] * 1 / this.proportions[row]) / this.data[column].content.length);
                        positions[1] += (this.options.size[1] * (1 / this.proportions[row])) / this.data[column].content.length
                    }
                } else {
                    this.pdf.text(positions[0] + this.options.text_margin[0],
                            positions[1] + this.options.text_margin[1],
                            this.data[column].content[row]);
                    this.pdf.rect(positions[0],
                            positions[1],
                            this.options.size[0] * this.data[column].proportion,
                            (this.options.size[1] / this.data[column].content.length))
                    positions[1] += this.options.size[1] / this.data[column].content.length
                }
            }
            positions[0] += this.options.size[0] * this.data[column].proportion;
            positions[1] = this.options.position[1];
        }
    }
    // private getProportion(column, items, width): Float32Array{
    // }
    private getProportions() {
        // See the proportions
        const proportions: any = [];
        for (const column in this.data) {
            proportions.push({'column': column, 'items': []})
            for (const row of this.data[column].content) {
                if (Array.isArray(row)) {
                    proportions[column].items.push(row.length)
                } else {
                    proportions[column].items.push(1)
                }
            }
        }
        console.log(proportions)
        // Define the proportions
        // [2 Repeticiones]
        let proportion: number[] = [];
        for (const row in proportions[0].items) {
            for (const column in proportions) {
                proportion.push(proportions[column].items[row]);
            }
            this.proportions.push(Math.max.apply(Math, proportion))
            proportion = []
        }
    }
    public downloadPDF(name: string) {
        this.pdf.save(name)
    }
}
