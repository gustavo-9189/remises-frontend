import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';
import { ModalWarningComponent } from '../modal/modal-warning/modal-warning.component';

import { ClienteService } from '../../services/cliente/cliente.service';
import { ProvinciaService } from '../../services/provincia/provincia.service';


@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
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

    // Arrays de los selects
    provincias: [any];
    citys: [any];

    constructor(
        private dialog: MdDialog,
        private location: Location,
        private service: ClienteService,
        private provinciaService: ProvinciaService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    createFormControls(): void {
        this.id = new FormControl();
        this.nombre = new FormControl('', Validators.required);
        this.apellido = new FormControl('', Validators.required);
        this.dni = new FormControl('', [Validators.required, Validators.min(5000000), Validators.max(100000000)]);
        this.email = new FormControl('', Validators.email);
        this.telefono = new FormControl();
        this.direccion = new FormControl('', Validators.required);
        this.codigoPostal = new FormControl('', Validators.max(999999));
        this.provincia = new FormControl('', Validators.required);
        this.ciudad = new FormControl('', Validators.required);
        // this.latitud = new FormControl('', Validators.required);
        // this.longitud = new FormControl('', Validators.required);
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
            ciudad: this.ciudad
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
        this.service.get(id).subscribe(cliente => {
            self.id.setValue(cliente.id);
            self.nombre.setValue(cliente.nombre);
            self.apellido.setValue(cliente.apellido);
            self.dni.setValue(cliente.dni);
            self.email.setValue(cliente.email);
            self.telefono.setValue(cliente.telefono);
            self.direccion.setValue(cliente.direccion);
            self.codigoPostal.setValue(cliente.codigoPostal);
            self.provincia.setValue(cliente.provincia);
            self.ciudad.setValue(cliente.ciudad);
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
        this.service.save(this.myform.value).subscribe(response => {
            self.dialog.open(ModalComponent);
            self.myform.reset();
        }, error => {
            self.dialog.open(ModalErrorComponent);
        });
    }

    back(): void {
        this.location.back();
    }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
        this.loadSelect();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.setForm(id);
        }
    }

}
