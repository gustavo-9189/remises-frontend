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
    choferes: [any];
    estados: [any];

    constructor(
        private dialog: MdDialog,
        private service: ViajeService,
        private choferService: ChoferService,
        private estadoService: EstadoService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    createFormControls(): void {
        this.id = new FormControl();
        this.chofer = new FormControl();
        this.cliente = new FormControl();
        this.precio = new FormControl('', [Validators.min(0), Validators.max(99999999999999)]);
        this.origen = new FormControl();
        // this.latitudOrigen = new FormControl();
        // this.longitudOrigen = new FormControl();
        this.destino = new FormControl();
        // this.latitudDestino = new FormControl();
        // this.latitudDestino = new FormControl();

        const DATE = new Date();
        const TIME = DATE.getHours() + ':' + DATE.getMinutes();

        this.fecha = new FormControl(DATE);               // por defecto la fecha actual
        this.hora = new FormControl(TIME);                // por defecto la hora actual
        this.estado = new FormControl(2);
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
            self.fecha.setValue(viaje.fecha);
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
