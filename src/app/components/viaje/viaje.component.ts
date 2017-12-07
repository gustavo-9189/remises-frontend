import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';
import { ModalWarningComponent } from '../modal/modal-warning/modal-warning.component';

import { ViajeService } from '../../services/viaje/viaje.service';
import { ChoferService } from '../../services/chofer/chofer.service';
import { EstadoService } from '../../services/estado/estado.service';
import { ClienteService } from '../../services/cliente/cliente.service';

import { NumberFunctions } from './NumberFunctions';
import { Estado } from './estado';
import { Cliente } from '../cliente/cliente';
import { Chofer } from '../chofer/chofer';
import { Constantes } from '../../../environments/constantes';

@Component({
    selector: 'app-viaje',
    templateUrl: './viaje.component.html',
    styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

    // Formulario
    myform: FormGroup;

    // Campos del formulario
    id: FormControl;
    chofer: FormControl;
    cliente: FormControl;
    precio: FormControl;
    origen: FormControl;
    latitudOrigen: FormControl;
    longitudOrigen: FormControl;
    destino: FormControl;
    latitudDestino: FormControl;
    longitudDestino: FormControl;
    fecha: FormControl;
    hora: FormControl;
    estado: FormControl;

    // Arrays de los selects
    choferes: [Chofer];
    estados: [Estado];
    clientes: [Cliente];

    constructor(
        private dialog: MdDialog,
        private service: ViajeService,
        private choferService: ChoferService,
        private estadoService: EstadoService,
        private clienteService: ClienteService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    createFormControls(): void {
        this.id = new FormControl();
        this.chofer = new FormControl();
        this.cliente = new FormControl();
        this.precio = new FormControl('', [Validators.min(0), Validators.pattern(Constantes.CP_PATTERN)]);
        this.origen = new FormControl();
        // this.latitudOrigen = new FormControl();
        // this.longitudOrigen = new FormControl();
        this.destino = new FormControl();
        // this.latitudDestino = new FormControl();
        // this.latitudDestino = new FormControl();
        this.fecha = new FormControl();
        this.hora = new FormControl();
        this.estado = new FormControl();
    }

    createForm(): void {
        this.myform = new FormGroup({
            id: this.id,
            chofer: this.chofer,
            cliente: this.cliente,
            precio: this.precio,
            origen: this.origen,
            destino: this.destino,
            fecha: this.fecha,
            hora: this.hora,
            estado: this.estado
        });
    }

    setForm(id: any): void {
        const self = this;
        this.service.get(id).subscribe(viaje => {
            self.id.setValue(viaje.id);
            self.chofer.setValue(viaje.chofer);
            self.cliente.setValue(viaje.cliente);
            self.precio.setValue(viaje.precio);
            self.origen.setValue(viaje.origen);
            self.destino.setValue(viaje.destino);

            self.fecha.enable();
            self.hora.enable();

            const DATE = new Date(viaje.fecha);
            const DATE_STR = NumberFunctions.dateToStr(DATE);

            self.fecha.setValue(DATE_STR);
            self.hora.setValue(viaje.hora);
            self.estado.setValue(viaje.estado);
        }, error => {
            self.dialog.open(ModalErrorComponent);
        });
    }

    loadSelect(): void {
        const self = this;
        this.choferService.list().subscribe(choferes => {
            self.choferes = choferes;
        });
        this.estadoService.list().subscribe(estados => {
            self.estados = estados;
        });
        this.clienteService.list().subscribe(clientes => {
            self.clientes = clientes;
        });
    }

    guardar(): void {
        const self = this;
        if (!this.myform.valid) {
            self.dialog.open(ModalWarningComponent);
            return;
        }
        // Habilito la FECHA y HORA
        this.fecha.enable();
        this.hora.enable();

        // Agrego el objeto Cliente
        const ID_CLIENTE = this.myform.value.cliente;
        this.myform.value.cliente = {
            id: ID_CLIENTE
        };
        // Agrego el objeto Chofer
        const ID_CHOFER = this.myform.value.chofer;
        this.myform.value.chofer = {
            id: ID_CHOFER
        };

        this.service.save(this.myform.value).subscribe(response => {
            self.dialog.open(ModalComponent);
            // self.myform.reset();
            // self.setDefault();
        }, error => {
            self.dialog.open(ModalErrorComponent);
        });
    }

    back(): void {
        this.location.back();
    }

    setDefault(): void {
        const DATE = new Date();
        const TIME = DATE.getHours() + ':' + DATE.getMinutes();
        const DATE_STR = NumberFunctions.dateToStr(DATE);

        this.fecha.setValue(DATE_STR);           // fecha actual
        this.hora.setValue(TIME);                // hora actual
        this.estado.setValue(2);                 // EN VIAJE

        // deshabilitados por default
        this.fecha.disable();
        this.hora.disable();
    }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
        this.loadSelect();
        this.setDefault();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.setForm(id);
        }
    }

}
