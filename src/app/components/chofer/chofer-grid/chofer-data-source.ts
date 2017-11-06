import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSort, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Chofer } from '../../chofer/chofer';
import { ChoferDataBase } from '../../chofer/chofer-grid/chofer-data-base';

export class ChoferDataSource extends DataSource<any> {

    filterChange = new BehaviorSubject('');

    get filter(): string {
        return this.filterChange.value;
    }

    set filter(filter: string) {
        this.filterChange.next(filter);
    }

    constructor(
        private dataBase: ChoferDataBase,
        private sort: MdSort
    ) {
        super();
    }

    connect(): Observable<Chofer[]> {
        const displayDataChanges = [
            this.dataBase.dataChange,
            this.filterChange,
            this.sort.mdSortChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.dataBase.data.slice().filter((item: Chofer) => {
                const searchStr = (
                    item.dni +
                    item.nombre + ' ' +
                    item.apellido
                ).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    getSortedData(): Chofer[] {
        const data = this.dataBase.data.slice();
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this.sort.active) {
                case 'nombre':
                    [propertyA, propertyB] = [a.nombre, b.nombre];
                    break;
                case 'apellido':
                    [propertyA, propertyB] = [a.apellido, b.apellido];
                    break;
                case 'dni':
                    [propertyA, propertyB] = [a.dni, b.dni];
                    break;
                case 'direccion':
                    [propertyA, propertyB] = [a.direccion, b.direccion];
                    break;
                case 'ciudad':
                    [propertyA, propertyB] = [a.ciudad, b.ciudad];
                    break;
                case 'telefono':
                    [propertyA, propertyB] = [a.telefono, b.telefono];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect() { }
}
