import { Component, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-modal-error',
    templateUrl: './modal-error.component.html',
    styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {

    constructor(
        public dialogRef: MdDialogRef<ModalErrorComponent>
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeModal(): void {
        this.dialogRef.close();
    }

}
