import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';
import { ModalWarningComponent } from '../modal/modal-warning/modal-warning.component';

import { RegistrarseService } from '../../services/registrarse/registrarse.service';
import { ProvinciaService } from '../../services/provincia/provincia.service';

@Component({
    selector: 'app-registrarse',
    templateUrl: './registrarse.component.html',
    styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

    // Formulario
    myform: FormGroup;

    // Campos del formulario
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
    clave: FormControl;
    confirmaClave: FormControl;

    // Arrays de los selects
    provincias: [any];
    citys: [any];

    constructor(
        private dialog: MdDialog,
        private location: Location,
        private service: RegistrarseService,
        private provinciaService: ProvinciaService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    createFormControls(): void {
        this.id = new FormControl();
        this.nombre = new FormControl('', Validators.required);
        this.apellido = new FormControl('', Validators.required);
        this.dni = new FormControl('', [Validators.required, Validators.min(5000000), Validators.max(100000000)]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.telefono = new FormControl();
        this.direccion = new FormControl();
        this.codigoPostal = new FormControl('', Validators.max(999999));
        this.provincia = new FormControl();
        this.ciudad = new FormControl();
        this.clave = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.confirmaClave = new FormControl('', [Validators.required, Validators.minLength(6)]);
    }

    createForm(): void {
        this.myform = new FormGroup({
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
            clave: this.clave,
            confirmaClave: this.confirmaClave
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

    guardar(): void {
        const self = this;
        if (!this.myform.valid) {
            this.dialog.open(ModalWarningComponent);
            return;
        }
        this.service.save(this.myform.value).subscribe(response => {
            self.dialog.open(ModalComponent);
            self.myform.reset();
        }, error => {
            self.dialog.open(ModalErrorComponent);
        });
    }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
        this.loadSelect();
    }
}
