import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Constantes } from '../../../environments/constantes';

@Injectable()
export class ProvinciaService {

    private static URI = Constantes.API_URI + 'provincia';

    constructor(
        private http: HttpClient
    ) { }

    get(id): Observable<any> {
        const URI = `${ProvinciaService.URI}/${id}`;
        return this.http.get(URI);
    }

    list(): Observable<any> {
        return this.http.get(ProvinciaService.URI);
    }

}
