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
import { ClienteDataBase } from '../../cliente/cliente-grid/cliente-data-base';
import { ClienteDataSource } from '../../cliente/cliente-grid/cliente-data-source';

import { ProvinciaService } from '../../../services/provincia/provincia.service';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
    selector: 'app-cliente-grid',
    styleUrls: ['cliente-grid.component.css'],
    templateUrl: 'cliente-grid.component.html',
})
export class ClienteGridComponent implements OnInit {
    displayedColumns = ['nombre', 'apellido', 'dni', 'direccion', 'ciudad', 'telefono', 'accion'];

    dataBase: ClienteDataBase;
    dataSource: ClienteDataSource | null;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MdSort)
    sort: MdSort;

    constructor(
        private dialog: MdDialog,
        private service: ClienteService,
        private provinciaService: ProvinciaService,
        private change: ChangeDetectorRef
    ) { }

    remove(id): void {
        const self = this;
        const parameters = {
            data: {
                id: id,
                entity: 'cliente'
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
        this.dataBase = new ClienteDataBase(this.service, this.provinciaService);
        this.dataSource = new ClienteDataSource(this.dataBase, this.sort);
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
        this.refreshGrid();
    }
}
