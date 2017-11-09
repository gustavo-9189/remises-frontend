import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Location } from '@angular/common';

import { ModalComponent } from '../modal/modal.component';
import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';
import { ModalWarningComponent } from '../modal/modal-warning/modal-warning.component';

import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    myform: FormGroup;

    // Campos del formulario
    user: FormControl;
    pass: FormControl;

    constructor(
        private dialog: MdDialog,
        private location: Location,
        private service: ClienteService
    ) { }

    createFormControls() {
        this.user = new FormControl('', Validators.required);
        this.pass = new FormControl('', Validators.required);
    }

    createForm() {
        this.myform = new FormGroup({
            user: this.user,
            pass: this.pass
        });
    }

    enviar() {
        const self = this;
        if (!this.myform.valid) {
            self.dialog.open(ModalWarningComponent, {
                width: '350px'
            });
            return;
        }
        const onSucces = function () {
            self.dialog.open(ModalComponent, {
                width: '350px'
            });
            self.myform.reset();
        };
        const onError = function () {
            self.dialog.open(ModalErrorComponent, {
                width: '350px'
            });
        };
        this.service.save(this.myform.value).subscribe(onSucces, onError);
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

}
