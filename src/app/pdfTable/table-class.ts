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
        this.pdf.setDrawColor(this.options.border_color[0], this.options.border_color[1], this.options.border_color[2]);        
        // const proportion = 0.1; Proporcion necesaria.
        for (const column in this.data) {
            if (this.data[column].header == null){
                this.setColumn(column, positions)
            }
            else{
                this.pdf.setFillColor(this.options.header.color[0], this.options.header.color[1], this.options.header.color[2]);            
                this.pdf.setTextColor(this.options.header.text_color[0], this.options.header.text_color[1], this.options.header.text_color[2])
                this.pdf.rect(positions[0],
                    positions[1],
                    this.options.size[0] * this.data[column].proportion,
                    this.options.header.height,
                    'FD');
                this.pdf.text(positions[0] + this.options.text.margin[0],
                    positions[1] + this.options.text.margin[1],
                    this.data[column].header);
                positions[1] += this.options.header.height;
                this.setColumn(column, positions)
            }
        }
    }
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
    // TODO -> Siempre se va a poder crear un campo vacio, y cada campo va a poder tener sus propiedades unitarias.
    private setColumn(column, positions){
        for (const row in this.data[column].content) {
            this.pdf.setTextColor(this.options.text.color[0], this.options.text.color[1], this.options.text.color[2])
            if (Array.isArray(this.data[column].content[row])) {
                for (const secondary_row of this.data[column].content[row]) {
                    this.setRowFillColor(column, row);        
                    this.pdf.rect(positions[0],
                        positions[1],
                        this.options.size[0] * this.data[column].proportion,
                        (this.options.size[1] * 1 / this.proportions[row]) / this.data[column].content.length,
                        'FD');
                    this.pdf.text(positions[0] + this.options.text.margin[0],
                        positions[1] + this.options.text.margin[1],
                        secondary_row);
                    positions[1] += (this.options.size[1] * (1 / this.proportions[row])) / this.data[column].content.length
                }
            } else {
                this.setRowFillColor(column, row);                
                this.pdf.rect(positions[0],
                        positions[1],
                        this.options.size[0] * this.data[column].proportion,
                        (this.options.size[1] / this.data[column].content.length),
                        'FD')
                this.pdf.text(positions[0] + this.options.text.margin[0],
                        positions[1] + this.options.text.margin[1],
                        this.data[column].content[row]);
                positions[1] += this.options.size[1] / this.data[column].content.length
            }
        }
        positions[0] += this.options.size[0] * this.data[column].proportion;
        positions[1] = this.options.position[1];
        return positions;
    }
    private setRowFillColor(column, row) {
        let color = this.data[column].table.fill_color;
        this.pdf.setFillColor(color[0], color[1], color[2]);
    }
    public downloadPDF(name: string) {
        this.pdf.save(name)
    }
}
