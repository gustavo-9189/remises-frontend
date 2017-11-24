import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Viaje } from '../viaje';
import { Cliente } from '../../cliente/cliente';
import { Chofer } from '../../chofer/chofer';

import { ViajeService } from '../../../services/viaje/viaje.service';
import { ChoferService } from '../../../services/chofer/chofer.service';
import { ClienteService } from '../../../services/cliente/cliente.service';

export class ViajeDataBase {
    dataChange: BehaviorSubject<Viaje[]> = new BehaviorSubject<Viaje[]>([]);
    clientes: [Cliente];
    choferes: [Chofer];

    get data(): Viaje[] {
        return this.dataChange.value;
    }

    constructor(
        private service: ViajeService,
        private clienteService: ClienteService,
        private choferService: ChoferService
    ) {
        this.addViaje();
    }

    addViaje(): void {
        const self = this;
        const copiedData = this.data.slice();

        this.service.list().subscribe(viajes => {
            if (viajes) {
                viajes.forEach(element => {
                    self.clienteService.get(element.cliente).subscribe(cliente => {
                        element.clienteText = cliente.apellido;
                        self.choferService.get(element.chofer).subscribe(chofer => {
                            element.choferText = chofer.apellido;
                            copiedData.push(element);
                            self.dataChange.next(copiedData);
                        });
                    });
                });
            }
        });
    }

}
