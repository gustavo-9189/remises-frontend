import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Constantes } from '../../../environments/constantes';

@Injectable()
export class AutomovilService {

    private static URI = Constantes.API_URI + 'automovil';

    constructor(
        private http: HttpClient
    ) { }

    get(id): Observable<any> {
        const URI = `${AutomovilService.URI}/${id}`;
        return this.http.get(URI);
    }

    list(): Observable<any> {
        return this.http.get(AutomovilService.URI);
    }

    save(param): Observable<any> {
        const body = JSON.stringify(param);

        if (param.id) {
            const URI = `${AutomovilService.URI}/${param.id}`;
            return this.http.put(URI, body);
        } else {
            return this.http.post(AutomovilService.URI, body);
        }
    }

    delete(id): Observable<any> {
        const URI = `${AutomovilService.URI}/${id}`;
        return this.http.delete(URI);
    }

}
