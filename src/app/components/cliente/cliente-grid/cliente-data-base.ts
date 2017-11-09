import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Cliente } from '../cliente';

import { ClienteService } from '../../../services/cliente/cliente.service';
import { ProvinciaService } from '../../../services/provincia/provincia.service';

export class ClienteDataBase {
    dataChange: BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);
    citys: [any];

    get data(): Cliente[] {
        return this.dataChange.value;
    }

    constructor(
        private service: ClienteService,
        private provinciaService: ProvinciaService
    ) {
        this.loadCitys();
    }

    loadCitys(): void {
        const self = this;
        this.provinciaService.list().subscribe(provincias => {
            self.citys = provincias.find(items => {
                return items.id === 1;
            }).ciudades;
            this.addCliente();
        });
    }

    addCliente(): void {
        const self = this;
        const copiedData = this.data.slice();

        this.service.list().subscribe(items => {
            if (items) {
                items.forEach(element => {
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
