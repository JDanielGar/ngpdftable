export class TableOptions {
    border_color: any[];
    size: any[];
    position: any[];
    font_size: number;
    header: any;    
    text: any;

    constructor() {
        this.size = [0, 0];
        this.position = [0, 0];
        this.font_size = 0;
        this.border_color = [0, 0, 0];
        this.header = {
            'color': [255, 255, 255],
            'height': 0,
            'text_color': [0, 0, 0]
        };
        this.text = {
            'color': [0, 0, 0],
            'margin': [0, 0]
        }
    }
}
