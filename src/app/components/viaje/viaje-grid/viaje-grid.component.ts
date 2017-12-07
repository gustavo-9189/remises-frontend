import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdSort, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { ModalDeleteComponent } from '../../modal/modal-delete/modal-delete.component';
import { ModalComponent } from '../../modal/modal.component';
import { ViajeDataBase } from './viaje-data-base';
import { ViajeDataSource } from './viaje-data-source';

import { ViajeService } from '../../../services/viaje/viaje.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ChoferService } from '../../../services/chofer/chofer.service';
import { EstadoService } from '../../../services/estado/estado.service';

@Component({
    selector: 'app-viaje-grid',
    templateUrl: './viaje-grid.component.html',
    styleUrls: ['./viaje-grid.component.css']
})
export class ViajeGridComponent implements OnInit {

    displayedColumns = ['cliente', 'chofer', 'origen', 'destino', 'estado', 'precio', 'accion'];

    dataBase: ViajeDataBase;
    dataSource: ViajeDataSource | null;

    colorEstado: string;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MdSort)
    sort: MdSort;

    constructor(
        private dialog: MdDialog,
        private service: ViajeService,
        private clienteService: ClienteService,
        private choferService: ChoferService,
        private estadoService: EstadoService,
        private change: ChangeDetectorRef
    ) { }

    remove(id): void {
        const self = this;
        const parameters = {
            data: {
                id: id,
                entity: 'viaje'
            }
        };
        this.dialog
            .open(ModalDeleteComponent, parameters)
            .afterClosed()
            .subscribe(() => {
                self.refreshGrid();
            });
    }

    refreshGrid(): void {
        this.dataBase = new ViajeDataBase(this.service, this.clienteService, this.choferService, this.estadoService);
        this.dataSource = new ViajeDataSource(this.dataBase, this.sort);
        this.change.detectChanges();

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    ngOnInit(): void {
        this.colorEstado = 'black';
        this.refreshGrid();
    }

}
