import { Component } from '@angular/core';

import { ReporteService } from '../../services/reporte/reporte.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    constructor(
        private service: ReporteService
    ) { }

    download(): void {
        this.service.get(3).subscribe(excel => {
            const aux = URL.createObjectURL(excel);
            window.open(aux);
        });
    }

}
