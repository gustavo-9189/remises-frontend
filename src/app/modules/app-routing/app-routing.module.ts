import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../../app.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { HomeComponent } from '../../components/home/home.component';
import { ModalMapsComponent } from '../../components/modal/modal-maps/modal-maps.component';
import { ClienteComponent } from '../../components/cliente/cliente.component';
import { ClienteGridComponent } from '../../components/cliente/cliente-grid/cliente-grid.component';
import { ChoferComponent } from '../../components/chofer/chofer.component';
import { ChoferGridComponent } from '../../components/chofer/chofer-grid/chofer-grid.component';
import { AutomovilComponent } from '../../components/automovil/automovil.component';
import { ViajeComponent } from '../../components/viaje/viaje.component';
import { ReporteComponent } from '../../components/reporte/reporte.component';
import { GeolocalizacionComponent } from '../../components/geolocalizacion/geolocalizacion.component';
import { RegistrarseComponent } from '../../components/registrarse/registrarse.component';
import { LoginComponent } from '../../components/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'automovil', component: AutomovilComponent },
    { path: 'cliente', component: ClienteComponent },
    { path: 'cliente/:id', component: ClienteComponent },
    { path: 'clienteList', component: ClienteGridComponent },
    { path: 'chofer', component: ChoferComponent },
    { path: 'choferList', component: ChoferGridComponent },
    { path: 'reporte', component: ReporteComponent },
    { path: 'viaje', component: ViajeComponent },
    { path: 'maps', component: ModalMapsComponent },
    { path: 'geoloc', component: GeolocalizacionComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/home' } // TODO hacer un componente 404 not found
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
// tslint:disable-next-line:eofline
export class AppRoutingModule { }