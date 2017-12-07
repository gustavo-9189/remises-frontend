import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Viaje } from '../viaje';

import { ViajeService } from '../../../services/viaje/viaje.service';
import { ChoferService } from '../../../services/chofer/chofer.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { EstadoService } from '../../../services/estado/estado.service';

export class ViajeDataBase {
    dataChange: BehaviorSubject<Viaje[]> = new BehaviorSubject<Viaje[]>([]);

    get data(): Viaje[] {
        return this.dataChange.value;
    }

    constructor(
        private service: ViajeService,
        private clienteService: ClienteService,
        private choferService: ChoferService,
        private estadoService: EstadoService
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
                            self.estadoService.get(element.estado).subscribe(estado => {
                                element.estadoText = estado.nombre;
                                copiedData.push(element);
                                self.dataChange.next(copiedData);
                            });
                        });
                    });
                });
            }
        });
    }

}
