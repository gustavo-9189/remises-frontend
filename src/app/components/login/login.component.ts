import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { ModalErrorComponent } from '../modal/modal-error/modal-error.component';
import { ModalWarningComponent } from '../modal/modal-warning/modal-warning.component';

import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    myform: FormGroup;

    // Campos del formulario
    usuario: FormControl;
    clave: FormControl;

    constructor(
        private dialog: MdDialog,
        private router: Router,
        private service: LoginService
    ) { }

    createFormControls(): void {
        this.usuario = new FormControl('', [Validators.required, Validators.email]);
        this.clave = new FormControl('', [Validators.required, Validators.minLength(6)]);
    }

    createForm(): void {
        this.myform = new FormGroup({
            usuario: this.usuario,
            clave: this.clave
        });
    }

    enviar(): void {
        if (!this.myform.valid) {
            this.dialog.open(ModalWarningComponent);
            return;
        }
        this.service.logear(this.myform.value).subscribe(response => {
            this.router.navigate(['/home']);
        }, error => {
            this.dialog.open(ModalWarningComponent);
        });
    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

}
