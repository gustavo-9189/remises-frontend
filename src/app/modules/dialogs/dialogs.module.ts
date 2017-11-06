import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialog } from '@angular/material';

import { ModalComponent } from '../../components/modal/modal.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class DialogsModule {

    title: string;

    constructor(
        private dialog: MdDialog
    ) { }

    success(): void {
        this.title = '';
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '350px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('El dialogo de success se ha cerrado');
        });
    }

    warning(): void {
        this.title = '';
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '350px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('El dialogo de warning se ha cerrado');
        });
    }

    error(): void {
        this.title = '';
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '350px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('El dialogo de error se ha cerrado');
        });
    }

}
