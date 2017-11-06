import { Component, Pipe, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { AutomovilService } from '../../services/automovil/automovil.service';

import { Automovil } from '../../../model/automovil';

@Component({
    selector: 'app-automovil',
    templateUrl: './automovil.component.html',
    styleUrls: ['./automovil.component.css']
})
export class AutomovilComponent implements OnInit {

    myform: FormGroup;
    marca: FormControl;
    modelo: FormControl;
    patente: FormControl;
    anio: FormControl;

    constructor(private service: AutomovilService) { }

    createFormControls() {
        this.marca = new FormControl('', Validators.required);
        this.modelo = new FormControl('', Validators.required);
        this.patente = new FormControl('', Validators.required);
        this.anio = new FormControl('', Validators.required);
    }

    createForm() {
        this.myform = new FormGroup({
            marca: this.marca,
            modelo: this.modelo,
            patente: this.patente,
            anio: this.anio
        });
    }

    onSubmit() {
        if (this.myform.valid) {
            console.log(this.myform.value);
            this.service.save(this.myform.value);
            console.log('Automovil enviado al Backend!');
            this.myform.reset();
        }
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

}
