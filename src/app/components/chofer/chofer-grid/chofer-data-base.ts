import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Chofer } from '../chofer';

import { ChoferService } from '../../../services/chofer/chofer.service';
import { ProvinciaService } from '../../../services/provincia/provincia.service';

export class ChoferDataBase {
    dataChange: BehaviorSubject<Chofer[]> = new BehaviorSubject<Chofer[]>([]);
    citys: [any];

    get data(): Chofer[] {
        return this.dataChange.value;
    }

    constructor(
        private service: ChoferService,
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
            this.addChofer();
        });
    }

    addChofer(): void {
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
