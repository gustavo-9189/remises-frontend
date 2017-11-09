import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Constantes } from '../../../environments/constantes';

@Injectable()
export class ClienteService {

    private static URI = Constantes.API_URI + 'cliente';

    constructor(
        private http: HttpClient
    ) { }

    get(id): Observable<any> {
        const URI = `${ClienteService.URI}/${id}`;
        return this.http.get(URI);
    }

    list(): Observable<any> {
        return this.http.get(ClienteService.URI);
    }

    save(param): Observable<any> {
        const body = JSON.stringify(param);

        if (param.id) {
            const URI = `${ClienteService.URI}/${param.id}`;
            return this.http.put(URI, body);
        } else {
            return this.http.post(ClienteService.URI, body);
        }
    }

    delete(id): Observable<any> {
        const URI = `${ClienteService.URI}/${id}`;
        return this.http.delete(URI);
    }

}
