import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { ChoferService } from '../../services/chofer/chofer.service';
import { ReporteService } from '../../services/reporte/reporte.service';

import { Chofer } from '../chofer/chofer';

@Component({
    selector: 'app-reporte',
    templateUrl: './reporte.component.html',
    styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

    // Formulario
    myform: FormGroup;

    choferes: [Chofer];
    chofer: FormControl;

    constructor(
        private choferService: ChoferService,
        private service: ReporteService
    ) { }

    loadSelect(): void {
        const self = this;
        this.choferService.list().subscribe(choferes => {
            self.choferes = choferes;
        });
    }

    createFormControls(): void {
        this.chofer = new FormControl();
    }

    createForm(): void {
        this.myform = new FormGroup({
            chofer: this.chofer
        });
    }

    download(): void {
        this.service.get(this.chofer.value).subscribe(excel => {
            const aux = URL.createObjectURL(excel);
            window.open(aux);
        });
    }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
        this.loadSelect();
    }

}
