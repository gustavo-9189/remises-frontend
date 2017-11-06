import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css']
})
export class ModalWarningComponent {

    constructor(
        public dialogRef: MdDialogRef<ModalWarningComponent>
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeModal(): void {
        this.dialogRef.close();
    }
}
