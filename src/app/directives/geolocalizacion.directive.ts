import { Directive, Input, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';

declare let google: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[agm-directions]'
})
export class GeolocalizacionDirective implements OnInit {

    @Input()
    origin;

    @Input()
    destination;

    @Input()
    waypoits;

    constructor(
        private gmapsApi: GoogleMapsAPIWrapper
    ) { }

    ngOnInit() {
        this.gmapsApi.getNativeMap().then(map => {
            const directionsService = new google.maps.DirectionsService;
            const directionsDisplay = new google.maps.DirectionsRenderer;

            directionsDisplay.setMap(map);

            directionsService.route({
                origin: {
                    lat: this.origin.latitude,
                    lng: this.origin.longitude
                },
                destination: {
                    lat: this.destination.latitude,
                    lng: this.destination.longitude
                },
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, (response, status) => {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        });
    }
}
