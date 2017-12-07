import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';
import { ModalWarningComponent } from '../modal/modal-warning/modal-warning.component';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';

import { ChoferService } from '../../services/chofer/chofer.service';
import { ProvinciaService } from '../../services/provincia/provincia.service';

import { Constantes } from '../../../environments/constantes';

@Component({
    selector: 'app-chofer',
    templateUrl: './chofer.component.html',
    styleUrls: ['./chofer.component.css']
})
export class ChoferComponent implements OnInit {
    // Formulario
    myform: FormGroup;

    // Alta de Chofer
    id: FormControl;
    nombre: FormControl;
    apellido: FormControl;
    dni: FormControl;
    email: FormControl;
    telefono: FormControl;
    direccion: FormControl;
    codigoPostal: FormControl;
    provincia: FormControl;
    ciudad: FormControl;

    // Datos del Vehiculo
    idAuto: FormControl;
    marca: FormControl;
    modelo: FormControl;
    patente: FormControl;
    anio: FormControl;

    // Arrays de los selects
    provincias: [any];
    citys: [any];

    constructor(
        private dialog: MdDialog,
        private location: Location,
        private service: ChoferService,
        private provinciaService: ProvinciaService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    createFormControls(): void {
        // Datos del Chofer
        this.id = new FormControl();
        this.nombre = new FormControl('', Validators.pattern(Constantes.NAME_PATTERN));
        this.apellido = new FormControl('', Validators.pattern(Constantes.NAME_PATTERN));
        this.dni = new FormControl('', [Validators.min(5000000), Validators.pattern(Constantes.DNI_PATTERN)]);
        this.email = new FormControl('', Validators.email);
        this.telefono = new FormControl('', Validators.pattern(Constantes.TELEPHONE_PATTERN));
        this.direccion = new FormControl();
        this.codigoPostal = new FormControl('', Validators.pattern(Constantes.CP_PATTERN));
        this.provincia = new FormControl(1, Validators.required);         // por defecto BUENOS AIRES
        this.ciudad = new FormControl(329, Validators.required);          // por defecto GONZALEZ CATAN

        const YEAR_MAX = (new Date()).getFullYear();
        const YEAR_MIN = YEAR_MAX - 60;

        // Datos del Automovil
        this.idAuto = new FormControl();
        this.marca = new FormControl();
        this.modelo = new FormControl();
        this.patente = new FormControl();
        this.anio = new FormControl('', [Validators.min(YEAR_MIN), Validators.max(YEAR_MAX), Validators.pattern(Constantes.CP_PATTERN)]);

        // this.latitud = new FormControl('', Validators.required);
        // this.longitud = new FormControl('', Validators.required);
    }

    createForm(): void {
        this.myform = new FormGroup({
            // Datos del Chofer
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            dni: this.dni,
            email: this.email,
            telefono: this.telefono,
            direccion: this.direccion,
            codigoPostal: this.codigoPostal,
            provincia: this.provincia,
            ciudad: this.ciudad,

            // Datos del Automovil
            idAuto: this.idAuto,
            marca: this.marca,
            modelo: this.modelo,
            patente: this.patente,
            anio: this.anio
            // latitud: this.latitud,
            // longitud: this.longitud
        });
    }

    loadSelect(): void {
        const self = this;
        this.provinciaService.list().subscribe(items => {
            self.provincias = items;
            self.citys = items.find(provincias => {
                return provincias.id === 1;
            }).ciudades;
        });
    }

    setForm(id: any): void {
        const self = this;
        this.service.get(id).subscribe(chofer => {
            // Setea los datos del Chofer
            self.id.setValue(chofer.id);
            self.nombre.setValue(chofer.nombre);
            self.apellido.setValue(chofer.apellido);
            self.dni.setValue(chofer.dni);
            self.email.setValue(chofer.email);
            self.telefono.setValue(chofer.telefono);
            self.direccion.setValue(chofer.direccion);
            self.codigoPostal.setValue(chofer.codigoPostal);
            self.provincia.setValue(chofer.provincia);
            self.ciudad.setValue(chofer.ciudad);

            // Sete los datos del Automovil
            self.idAuto.setValue(chofer.automovil.id);
            self.marca.setValue(chofer.automovil.marca);
            self.modelo.setValue(chofer.automovil.modelo);
            self.patente.setValue(chofer.automovil.patente);
            self.anio.setValue(chofer.automovil.anio);
        }, error => {
            self.dialog.open(ModalErrorComponent);
        });
    }

    guardar(): void {
        const self = this;
        if (!this.myform.valid) {
            self.dialog.open(ModalWarningComponent);
            return;
        }
        // Agrego el objeto Automovil
        this.myform.value.automovil = {
            id: this.idAuto.value,
            marca: this.marca.value,
            modelo: this.modelo.value,
            anio: this.anio.value,
            patente: this.patente.value
        };
        this.service.save(this.myform.value).subscribe(response => {
            self.dialog.open(ModalComponent);
            // self.myform.reset();
        }, error => {
            self.dialog.open(ModalErrorComponent);
        });
    }

    back(): void {
        this.location.back();
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.loadSelect();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.setForm(id);
        }
    }

}
