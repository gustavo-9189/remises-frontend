import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Constantes } from '../../../environments/constantes';

@Injectable()
export class EstadoService {

    private static URI = Constantes.API_URI + 'estado';

    constructor(
        private http: HttpClient
    ) { }

    get(id): Observable<any> {
        const URI = `${EstadoService.URI}/${id}`;
        return this.http.get(URI);
    }

    list(): Observable<any> {
        return this.http.get(EstadoService.URI);
    }

    save(param): Observable<any> {
        const body = JSON.stringify(param);

        if (param.id) {
            const URI = `${EstadoService.URI}/${param.id}`;
            return this.http.put(URI, body);
        } else {
            return this.http.post(EstadoService.URI, body);
        }
    }

    delete(id): Observable<any> {
        const URI = `${EstadoService.URI}/${id}`;
        return this.http.delete(URI);
    }

}
