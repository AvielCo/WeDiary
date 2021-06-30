import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@routing-module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from '@app-component';
import { HeaderComponent } from '@header/header.component';
import { AuthComponent } from '@auth/auth.component';
import { EventsComponent } from '@events/events.component';
import { AddComponent } from '@events/add/add.component';
import { GuestsComponent } from '@guests/guests.component';
import { AlertComponent } from '@shared/alert/alert.component';
import { TableComponent } from '@guests/table/table.component';
import { SummaryComponent } from '@guests/summary/summary.component';
import { LoadingSpinnerComponent } from '@shared/loading-spinner/loading-spinner.component';
import { ModalContainerComponent } from '@shared/modal-container/modal-container.component';

import { AuthInterceptor } from '@auth/auth.interceptor';
import { reducers } from '@store/index';
import { AuthEffects } from '@store/effects/auth.effects';
import { EventEffects } from '@store/effects/event.effects';
import { GuestEffects } from '@store/effects/guests.effects';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from '@page-not-found/page-not-found.component';
import { HomeComponent } from '@home/home.component';

@NgModule({
  declarations: [
    AddComponent,
    AlertComponent,
    AppComponent,
    AuthComponent,
    EventsComponent,
    GuestsComponent,
    HeaderComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    SummaryComponent,
    TableComponent,
    ModalContainerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    EffectsModule.forRoot([AuthEffects, EventEffects, GuestEffects]),
    FormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
