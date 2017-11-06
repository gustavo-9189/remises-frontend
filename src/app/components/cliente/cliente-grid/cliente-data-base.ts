import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Cliente } from '../cliente';

import { ClienteService } from '../../../services/cliente/cliente.service';
import { GenericService } from '../../../services/generic/generic.service';

export class ClienteDataBase {
    dataChange: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);
    citys: [any];

    get data(): Cliente[] {
        return this.dataChange.value;
    }

    constructor(
        private service: ClienteService,
        private genericService: GenericService
    ) {
        this.loadCitys();
    }

    loadCitys(): void {
        const self = this;
        this.genericService.list().subscribe(response => {
            self.citys = response.json();
            this.addCliente();
        });
    }

    addCliente(): void {
        const self = this;
        const copiedData = this.data.slice();

        this.service.list().subscribe(items => {
            if (items.json()) {
                items.json().forEach(element => {
                    const cityObject = self.citys.find(res => {
                        // tslint:disable-next-line:triple-equals
                        return res.id == element.ciudad;
                    });
                    element.ciudadText = cityObject.nombre;
                    copiedData.push(element);
                    this.dataChange.next(copiedData);
                });
            }
        });
    }

}
