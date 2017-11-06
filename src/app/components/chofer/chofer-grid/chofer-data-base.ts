import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Chofer } from '../chofer';
import { ChoferService } from '../../../services/chofer/chofer.service';

export class ChoferDataBase {
    dataChange: BehaviorSubject<Chofer[]> = new BehaviorSubject<Chofer[]>([]);
    choferes: Array<Chofer>;

    get data(): Chofer[] {
        return this.dataChange.value;
    }

    constructor(
        private service: ChoferService
    ) {
        this.addChofer();
    }

    addChofer(): void {
        const copiedData = this.data.slice();

        this.service.list().subscribe(items => {
            if (items.json()) {
                items.json().forEach(element => {
                    copiedData.push(element);
                    this.dataChange.next(copiedData);
                });
            }
        });
    }
}
