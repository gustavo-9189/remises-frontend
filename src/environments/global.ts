import { Http, Response, Headers, RequestOptions } from '@angular/http';

export class Global {

    // Datos para la URI (conexion al backend)
    protocol: string;
    host: string;
    port: string;
    uri: string;
    apiURI: string;

    // Datos del encabezado (formato JSON)
    headers: Headers;
    options: RequestOptions;

    constructor() {
        this.protocol = 'http://';
        this.host = 'localhost:';
        this.port = '8080';
        this.uri = '/remises-backend/';
        this.apiURI = this.protocol + this.host + this.port + this.uri;

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

}
