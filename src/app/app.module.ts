// Modulos de terceros
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

// Componentes
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteGridComponent } from './components/cliente/cliente-grid/cliente-grid.component';
import { ChoferComponent } from './components/chofer/chofer.component';
import { ChoferGridComponent } from './components/chofer/chofer-grid/chofer-grid.component';
import { AutomovilComponent } from './components/automovil/automovil.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalMapsComponent } from './components/modal/modal-maps/modal-maps.component';
import { ModalDeleteComponent } from './components/modal/modal-delete/modal-delete.component';
import { ModalErrorComponent } from './components/modal/modal-error/modal-error.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { ModalWarningComponent } from './components/modal/modal-warning/modal-warning.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';

// Directivas
import { GeolocalizacionDirective } from './directives/geolocalizacion.directive';

// Modulos
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { DialogsModule } from './modules/dialogs/dialogs.module';

// Servicios
import { AuthService } from './services/auth/auth.service';
import { AutomovilService } from './services/automovil/automovil.service';
import { ChoferService } from './services/chofer/chofer.service';
import { ClienteService } from './services/cliente/cliente.service';
import { ProvinciaService } from './services/provincia/provincia.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        DialogsModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyAVcygTcplcHYGDL1U-rXeltm_ZrPmkEnk' })
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
        ClienteComponent,
        ClienteGridComponent,
        ChoferComponent,
        ChoferGridComponent,
        AutomovilComponent,
        ViajeComponent,
        ReporteComponent,
        ModalMapsComponent,
        ModalComponent,
        ModalDeleteComponent,
        ModalErrorComponent,
        ModalWarningComponent,
        GeolocalizacionComponent,
        LoginComponent,
        RegistrarseComponent,
        GeolocalizacionDirective
    ],
    entryComponents: [
        ModalComponent,
        ModalDeleteComponent,
        ModalErrorComponent,
        ModalWarningComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthService,
            multi: true
        },
        AutomovilService,
        ChoferService,
        ClienteService,
        ProvinciaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
