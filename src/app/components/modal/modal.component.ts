import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {

    constructor(
        private location: Location,
        public dialogRef: MdDialogRef<ModalComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
        this.location.back();
    }

    closeModal(): void {
        this.dialogRef.close();
        this.location.back();
    }

}
