import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Global } from '../../../environments/global';

@Injectable()
export class GenericService extends Global {

    constructor(private http: Http) {
        super();
    }

    get(id): Observable<Response> {
        return this.http.get(`${this.apiURI}provincia/${id}`);
    }

    list(): Observable<Response> {
        return this.http.get(`${this.apiURI}provincia`);
    }
}
