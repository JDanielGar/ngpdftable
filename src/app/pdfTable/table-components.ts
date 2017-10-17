import * as jsPDF from 'jspdf';

export class PDFComponent {

    public pdf = new jsPDF('1', 'pt', 'a4');
    private pointer:any [] = [0, 0]
    // color_herarchy = [fill_color: [], text_color: [], draw_color: []]
    private color_herarchy: any [] = [0, 0, 0];
    private text_offset_herarchy: any [] = [0, 0];


    constructor (private components: any[]) {
        this.components = components;
    }
    private loadTable (position: any[] = [0, 0], size: any[] = [100, 100], component: any): void {
        this.setRect(position, size, component);
        this.setFont(size, component);
        this.setContent(position, component);

        // Sumarle a la posicion Y
        this.searchDirection(position, size, component);
    }
    
    public setRect (position, size, component) {
        this.fillColor(component);
        this.drawColor(component);
        this.pdf.rect(
            position[0]+this.pointer[0],
            position[1]+this.pointer[1],
            size[0]*component.x_proportion,
            size[1]*component.y_proportion,
            'FD'
        );
    }
    public setContent(position, component){
        this.textColor(component);        
        if ('content' in component) {
            if('text_offset' in component){
                this.pdf.text(
                    position[0]+this.pointer[0]+component.text_offset[0],
                    position[1]+this.pointer[1]+component.text_offset[1],
                    component.content
                );
                this.text_offset_herarchy = [component.text_offset[0], component.text_offset[1]];
            } else {
                this.pdf.text(
                    position[0]+this.pointer[0]+this.text_offset_herarchy[0],
                    position[1]+this.pointer[1]+this.text_offset_herarchy[1],
                    component.content
                );
            }
        }
    }
    public setFont(size, component){
        if ('font_size' in component) {
            this.pdf.setFontSize(component.font_size);
        } 
    }

    public setTable (position: any[] = [0, 0], size: any[] = [100, 100]) {
        this.pointer = [position[0], position[1]]
        for (let component of this.components) {
            this.loadTable(position, size, component);
        }
    }

    private searchDirection (position, size, component) {
        if ('direction' in component){
            if( component.direction == 'x' ) {
                this.pointer[0] += size[0]*component.x_proportion;
            } 
            else if (component.direction == 'y'){
                this.pointer[1] += size[1]*component.y_proportion;
            } else {
                console.warn('x and y directions only')
            }
        } else {
            if (size[0]*component == this.pointer[0]){
                this.pointer[1] += size[1]*component.y_proportion;
            } else {
                this.pointer[0] += size[0]*component.x_proportion;
            }
        }
    }

    private fillColor(component){
        if ('fill_color' in component ) {
            this.pdf.setFillColor(component.fill_color[0], component.fill_color[1], component.fill_color[2]);
            this.color_herarchy[0] = [component.fill_color[0], component.fill_color[1], component.fill_color[2]]
            console.log(this.color_herarchy[0])
        } else {
            this.pdf.setFillColor(this.color_herarchy[0][0], this.color_herarchy[0][1], this.color_herarchy[0][2])
        }
    }

    private textColor(component){
        if ('text_color' in component) {
            this.pdf.setTextColor(component.text_color[0], component.text_color[1], component.text_color[2]);    
            this.color_herarchy[1] = [component.text_color[0], component.text_color[1], component.text_color[2]]
        } else {
            this.pdf.setTextColor(this.color_herarchy[1][0], this.color_herarchy[1][1], this.color_herarchy[1][2])            
        }
    }

    private drawColor(component) { 
        if ('draw_color' in component ) {
            this.pdf.setDrawColor(component.draw_color[0], component.draw_color[1], component.draw_color[2]);
            this.color_herarchy[2] = [component.draw_color[0], component.draw_color[1], component.draw_color[2]]
        }
        else {
            this.pdf.setDrawColor(this.color_herarchy[2][0], this.color_herarchy[2][1], this.color_herarchy[2][2])
        }
    }
    public downloadPDF(name) {
        this.pdf.save(name)
    }
}