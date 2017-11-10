import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdSort, MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { ModalDeleteComponent } from '../../modal/modal-delete/modal-delete.component';

import { ProvinciaService } from '../../../services/provincia/provincia.service';
import { ChoferService } from '../../../services/chofer/chofer.service';

import { Chofer } from '../chofer';
import { ChoferDataBase } from '../chofer-grid/chofer-data-base';
import { ChoferDataSource } from '../chofer-grid/chofer-data-source';

@Component({
    selector: 'app-chofer-grid',
    styleUrls: ['chofer-grid.component.css'],
    templateUrl: 'chofer-grid.component.html',
})
export class ChoferGridComponent implements OnInit {
    displayedColumns = ['nombre', 'apellido', 'dni', 'direccion', 'ciudad', 'telefono', 'accion'];

    dataBase: ChoferDataBase;
    dataSource: ChoferDataSource | null;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MdSort)
    sort: MdSort;

    constructor(
        private dialog: MdDialog,
        private service: ChoferService,
        private provinciaService: ProvinciaService,
        private change: ChangeDetectorRef
    ) { }

    edit(): void {
        alert('EDIT');
    }

    remove(id): void {
        const self = this;
        const parameters = {
            data: {
                id: id,
                entity: 'chofer'
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
        this.dataBase = new ChoferDataBase(this.service, this.provinciaService);
        this.dataSource = new ChoferDataSource(this.dataBase, this.sort);
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
