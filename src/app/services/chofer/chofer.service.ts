import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Global } from '../../../environments/global';

@Injectable()
export class ChoferService extends Global {

    constructor(private http: Http) {
        super();
    }

    list(): Observable<Response> {
        return this.http.get(`${this.apiURI}chofer`);
    }

    save(param): Observable<Response> {
        const body = JSON.stringify(param);

        if (param.id) {
            return this.http.put(
                `${this.apiURI}chofer/${param.id}`,
                body,
                this.options
            );
        } else {
            return this.http.post(
                `${this.apiURI}chofer`,
                body,
                this.options
            );
        }
    }
}
