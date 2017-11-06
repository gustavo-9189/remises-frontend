import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';

import { ModalComponent } from '../modal/modal.component';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';

@Component({
    selector: 'app-chofer',
    templateUrl: './chofer.component.html',
    styleUrls: ['./chofer.component.css']
})
export class ChoferComponent implements OnInit {

    myform: FormGroup;

    // Alta de Chofer
    nombre: FormControl;
    apellido: FormControl;
    dni: FormControl;
    email: FormControl;
    telefono: FormControl;
    direccion: FormControl;
    codigoPostal: FormControl;
    ciudad: FormControl;

    // Datos del Vehiculo
    marca: FormControl;
    modelo: FormControl;
    patente: FormControl;
    anio: FormControl;

    constructor(
        private dialog: MdDialog,
        private location: Location
    ) { }

    createFormControls() {
        this.nombre = new FormControl('', Validators.required);
        this.apellido = new FormControl('', Validators.required);
        this.dni = new FormControl('', Validators.required);
        this.email = new FormControl('', Validators.required);
        this.telefono = new FormControl('', Validators.required);
        this.direccion = new FormControl('', Validators.required);
        this.codigoPostal = new FormControl('', Validators.required);
        this.ciudad = new FormControl('', Validators.required);
        this.marca = new FormControl('', Validators.required);
        this.modelo = new FormControl('', Validators.required);
        this.patente = new FormControl('', Validators.required);
        this.anio = new FormControl('', Validators.required);
        // this.latitud = new FormControl('', Validators.required);
        // this.longitud = new FormControl('', Validators.required);
    }

    createForm() {
        this.myform = new FormGroup({
            nombre: this.nombre,
            apellido: this.apellido,
            dni: this.dni,
            email: this.email,
            telefono: this.telefono,
            direccion: this.direccion,
            codigoPostal: this.codigoPostal,
            ciudad: this.ciudad,
            marca: this.marca,
            modelo: this.modelo,
            patente: this.patente,
            anio: this.anio
            // latitud: this.latitud,
            // longitud: this.longitud
        });
    }

    onGeolocalizacion() {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '350px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('El dialogo fue cerrado');
        });
    }

    onSubmit() {
        if (this.myform.valid) {
            const dialogRef = this.dialog.open(ModalComponent, {
                width: '350px'
            });

            dialogRef.afterClosed().subscribe(result => {
                console.log('El dialogo fue cerrado');
            });
            console.log(this.myform.value);
            // this.service.save(this.myform.value);
            console.log('Automovil enviado al Backend!');
            this.myform.reset();
        } else {
            const dialogRef = this.dialog.open(ModalErrorComponent, {
                width: '350px'
            });

            dialogRef.afterClosed().subscribe(result => {
                console.log('El dialogo fue cerrado');
            });
        }
    }

    back(): void {
        this.location.back();
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

}
