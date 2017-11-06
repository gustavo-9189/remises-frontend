import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';

import { ModalComponent } from '../../modal/modal.component';

@Component({
    selector: 'app-modal-maps',
    templateUrl: './modal-maps.component.html',
    styleUrls: ['./modal-maps.component.css']
})
export class ModalMapsComponent {

    animal: string;
    name: string;

    constructor(
        public dialog: MdDialog,
        public location: Location
    ) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '350px',
            data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    back(): void {
        this.location.back();
    }
}
