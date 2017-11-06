import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Global } from '../../../environments/global';

@Injectable()
export class ClienteService extends Global {

    constructor(private http: Http) {
        super();
    }

    get(id): Observable<Response> {
        return this.http.get(`${this.apiURI}cliente/${id}`);
    }

    list(): Observable<Response> {
        return this.http.get(`${this.apiURI}cliente`);
    }

    save(param): Observable<Response> {
        const body = JSON.stringify(param);

        if (param.id) {
            return this.http.put(
                `${this.apiURI}cliente/${param.id}`,
                body,
                this.options
            );
        } else {
            return this.http.post(
                `${this.apiURI}cliente`,
                body,
                this.options
            );
        }
    }

    delete(id): Observable<Response> {
        return this.http.delete(
            `${this.apiURI}cliente/${id}`,
            this.options
        );
    }
}
