import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Interceptor que agrega el encabezado al request http
 */
@Injectable()
export class AuthService implements HttpInterceptor {

    // Datos del encabezado (formato JSON)
    headers: HttpHeaders;

    constructor() {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const request = req.clone({
            headers: this.headers
        });

        return next.handle(request);
    }

}
