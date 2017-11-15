import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Constantes } from '../../../environments/constantes';

@Injectable()
export class LoginService {

    private static URI = Constantes.API_URI + 'login';

    constructor(
        private http: HttpClient
    ) { }

    logear(param): Observable<any> {
        return this.http.post(LoginService.URI, JSON.stringify(param));
    }

}
