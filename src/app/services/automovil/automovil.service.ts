import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Global } from '../../../environments/global';
import { Automovil } from '../../../model/automovil';

@Injectable()
export class AutomovilService extends Global {

    constructor(private http: Http) {
        super();
    }

    save(automovil: Automovil) {
        const url = this.apiURI + 'automovil';
        const body = JSON.stringify(automovil);

        const headers = new Headers({ 'Content-Type': 'application/json' });
        // const options = new RequestOptions(headers);

        const onSucces = function (response) {
            console.log('todo joya');
        };
        const onError = function (error) {
            console.error(error);
        };
        this.http.post(url, body, { headers: headers, withCredentials: true }).subscribe(onSucces, onError);
        // this.http.post(url, body, options).subscribe(onSucces, onError);
    }
}
