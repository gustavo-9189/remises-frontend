import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MouseEvent as AGMMouseEvent } from '@agm/core';

import { Marker } from './marker';

@Component({
    selector: 'app-geolocalizacion',
    templateUrl: './geolocalizacion.component.html',
    styleUrls: ['./geolocalizacion.component.css']
})
export class GeolocalizacionComponent implements OnInit {
    // google maps zoom level
    zoom: number;
    // ubicacion latitud y longitud
    lat: number;
    lng: number;
    // texto de referencia de los markers
    message: String;
    // contador de marcadores
    counterMarker: number;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: any) {
        if (this.counterMarker < 3) {
            this.markers.push({
                lat: $event.coords.lat,
                lng: $event.coords.lng,
                draggable: true,
                label: (this.counterMarker === 1) ? 'O' : 'D'
            });
            this.counterMarker++;
        }
    }

    mapRightClick($event: any) {
        if (this.counterMarker > 1) {
            this.markers.pop();
            this.counterMarker--;
        }
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    // tslint:disable-next-line:member-ordering
    markers: Marker[] = [{
        lat: -34.6657971,
        lng: -58.5678534,
        label: 'R',
        draggable: false
    }];

    constructor() { }

    ngOnInit() {
        this.counterMarker = 1;
        this.zoom = 15;
        this.lat = -34.670347;
        this.lng = -58.562965;
    }

}
