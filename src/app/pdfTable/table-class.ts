import * as jsPDF from 'jspdf';
import { TableOptions } from '../models/options';

// Normal Structure of Column:

let data_variable_a = [
    {
      'header': 'Item',
      'rows': ['content_rows'],
      'proportion': 0.1
    }
]

// Multiple columns in a row: 

let data_variable_b = [ 
    {
        'header': 'Fruits',
        'rows': {
            'content': [ // Content in row
                ['Pera', '320 cal'], // Row: [ Inner Columns of Row ]
                ['Manzana', '110 cal']
            ],
            'colors': [ // Colors in the content of Rows
                [[116, 255, 109], [196, 196, 196]],
                [[255, 130, 222], [196, 196, 196]]
            ]
        },
        'proportions': [[0.3], [0.7]] // Row inner Column Proportions
    }
]


// Table Options = {
//     'size': [x, y],
//     'position': [x, y],
//     'font_size': number,
//     'header_height': number,
//     'text_margin': [x, y]
//   }
// }

// If want someone text that have unitary fill color write " ['text', color] ", where Color is an Array [R, B, G].

export class PdfTable {
    public pdf = new jsPDF('1', 'pt', 'a4')
    private options: TableOptions;
    private data: any;
    private proportions: any[] = [];    
    // Without Proportions.

    constructor(options: TableOptions, data: any = []) {
        this.options = options;
        this.data = data;
        this.pdf.setFontSize(options.font_size)
        this.setTable();
    }
    
    private setTable() {
        for (const column_properties of this.data) {
            let printer = [this.options.position[0], this.options.position[1]];
            if ('header' in column_properties) {
                printer = this.setHeader(column_properties, printer);
                this.setRowItems(column_properties, printer);
            } else {
                console.log('Shit')
            }
        }
    }

    private setRowItems(column, printer) {
        if ('rows' in column) {
            for (let row of column.rows.content) {
                printer = this.printCell(row, printer);
            }
        } else {
            return [printer[0], this.options.position[1]]
        }
    }

    private printCell(cells, printer) {
        if (cells.length > 1) {
            for (let cell of cells) {
                this.printCell(cell, printer)
            }
        } else {

        }
    }
    // private getProportions() {
    //     // See the proportions
    //     const proportions: any = [];
    //     for (const column in this.data) {
    //         proportions.push({'column': column, 'items': []})
    //         for (const row of this.data[column].content) {
    //             if (Array.isArray(row)) {
    //                 proportions[column].items.push(row.length)
    //             } else {
    //                 proportions[column].items.push(1)
    //             }
    //         }
    //     }
    //     let proportion: number[] = [];
    //     for (const row in proportions[0].items) {
    //         for (const column in proportions) {
    //             proportion.push(proportions[column].items[row]);
    //         }
    //         this.proportions.push(Math.max.apply(Math, proportion))
    //         proportion = []
    //     }
    // }

    // private setTable(): void {
    //     const positions: any = [this.options.position[0], this.options.position[1]];
    //     this.pdf.setDrawColor(this.options.border_color[0], this.options.border_color[1], this.options.border_color[2]);        
    //     for (const column in this.data) {
    //         if (this.data[column].header == null){
    //             this.setColumn(column, positions)
    //         }
    //         else{
    //             this.setHeader(column, positions)
    //             this.setColumn(column, positions)
    //         }
    //     }
    // }

    // private setRowFillColor(column, row) {
    //     let color = this.data[column].table.fill_color;
    //     this.pdf.setFillColor(color[0], color[1], color[2]);
    // }

    // // TODO -> Siempre se va a poder crear un campo vacio, y cada campo va a poder tener sus propiedades unitarias.
    // private setColumn(column, positions){
    //     for (const row in this.data[column].content) {
    //         this.pdf.setTextColor(this.options.text.color[0], this.options.text.color[1], this.options.text.color[2])
    //         if (Array.isArray(this.data[column].content[row])) {
    //             for (const secondary_row of this.data[column].content[row]) {
    //                 this.setRowFillColor(column, row);        
    //                 this.pdf.rect(positions[0],
    //                     positions[1],
    //                     this.options.size[0] * this.data[column].proportion,
    //                     (this.options.size[1] * 1 / this.proportions[row]) / this.data[column].content.length,
    //                     'FD');
    //                 this.pdf.text(positions[0] + this.options.text.margin[0],
    //                     positions[1] + this.options.text.margin[1],
    //                     secondary_row);
    //                 positions[1] += (this.options.size[1] * (1 / this.proportions[row])) / this.data[column].content.length
    //             }
    //         } else {
    //             this.setRowFillColor(column, row);                
    //             this.pdf.rect(positions[0],
    //                     positions[1],
    //                     this.options.size[0] * this.data[column].proportion,
    //                     (this.options.size[1] / this.data[column].content.length),
    //                     'FD')
    //             this.pdf.text(positions[0] + this.options.text.margin[0],
    //                     positions[1] + this.options.text.margin[1],
    //                     this.data[column].content[row]);
    //             positions[1] += this.options.size[1] / this.data[column].content.length
    //         }
    //     }
    //     positions[0] += this.options.size[0] * this.data[column].proportion;
    //     positions[1] = this.options.position[1];
    //     return positions;
    // }
    private setHeader(column, printer) {
        this.pdf.setFillColor(column.header.fill_color[0], column.header.fill_color[1], column.header.fill_color[2]);            
        this.pdf.setTextColor(column.header.text_color[0], column.header.text_color[1], column.header.text_color[2])
        this.pdf.rect(
            printer[0],
            printer[1],
            column.proportions[0] * this.options.size[0],
            column.header.height,
            'FD'
        );
        this.pdf.text(
            printer[0] + this.options.text.margin[0],
            printer[1] + this.options.text.margin[1],
            column.header.content
        );
        printer[1] += column.header.height;
        return printer
    }
    public downloadPDF(name: string) {
        this.pdf.save(name)
    }
}
