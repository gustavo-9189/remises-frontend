import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSort, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Viaje } from '../viaje';
import { ViajeDataBase } from '../viaje-grid/viaje-data-base';

export class ViajeDataSource extends DataSource<any> {

    filterChange = new BehaviorSubject('');

    get filter(): string {
        return this.filterChange.value;
    }

    set filter(filter: string) {
        this.filterChange.next(filter);
    }

    constructor(
        private dataBase: ViajeDataBase,
        private sort: MdSort
    ) {
        super();
    }

    connect(): Observable<Viaje[]> {
        const displayDataChanges = [
            this.dataBase.dataChange,
            this.filterChange,
            this.sort.mdSortChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.dataBase.data.slice().filter((item: Viaje) => {
                const searchStr = (
                    item.id +
                    item.cliente +
                    item.chofer +
                    item.origen +
                    item.destino +
                    item.fecha
                ).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    getSortedData(): Viaje[] {
        const data = this.dataBase.data.slice();
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this.sort.active) {
                case 'cliente':
                    [propertyA, propertyB] = [a.cliente, b.cliente];
                    break;
                case 'chofer':
                    [propertyA, propertyB] = [a.chofer, b.chofer];
                    break;
                case 'origen':
                    [propertyA, propertyB] = [a.origen, b.origen];
                    break;
                case 'destino':
                    [propertyA, propertyB] = [a.destino, b.destino];
                    break;
                case 'precio':
                    [propertyA, propertyB] = [a.precio, b.precio];
                    break;
                case 'estado':
                    [propertyA, propertyB] = [a.estado, b.estado];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect() { }
}
