import { Component, Inject } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';

import { ModalComponent } from '../../modal/modal.component';
import { ModalErrorComponent } from '../../modal/modal-error/modal-error.component';

import { ClienteService } from '../../../services/cliente/cliente.service';
import { ChoferService } from '../../../services/chofer/chofer.service';
import { ViajeService } from '../../../services/viaje/viaje.service';

@Component({
    selector: 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

    constructor(
        private clienteService: ClienteService,
        private choferService: ChoferService,
        private viajeService: ViajeService,
        private dialog: MdDialog,
        public dialogRef: MdDialogRef<ModalDeleteComponent>,

        @Inject(MD_DIALOG_DATA)
        public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    acceptDelete(): void {
        switch (this.data.entity) {
            case 'cliente':
                this.clienteService.delete(this.data.id)
                    .subscribe(() => {
                        this.dialog.open(ModalComponent);
                    }, () => {
                        this.dialog.open(ModalErrorComponent);
                    });
                break;

            case 'chofer':
                this.choferService.delete(this.data.id)
                    .subscribe(() => {
                        this.dialog.open(ModalComponent);
                    }, () => {
                        this.dialog.open(ModalErrorComponent);
                    });
                break;

            case 'viaje':
                this.viajeService.delete(this.data.id)
                    .subscribe(() => {
                        this.dialog.open(ModalComponent);
                    }, () => {
                        this.dialog.open(ModalErrorComponent);
                    });
                break;
        }
        this.dialogRef.close();
    }

}
