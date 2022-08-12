import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { HomeComponent } from '../components/home/home.component';
import { FuelSaverComponent } from '../components/fuel-saver/fuel-saver.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../components/footer/footer.component';
import { FuelMapComponent } from '../components/fuel-map/fuel-map.component';
import { PopupComponent } from '../components/popup/popup.component';
import { FuelCalcComponent } from '../components/fuel-calc/fuel-calc.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    FuelSaverComponent,
    FooterComponent,
    FuelMapComponent,
    PopupComponent,
    FuelCalcComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
