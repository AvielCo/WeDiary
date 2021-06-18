import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { EventsComponent } from './events/events.component';
import { AddComponent } from './events/add/add.component';
import { GuestsComponent } from './guests/guests.component';

import { reducers } from './store';
import { SummaryComponent } from './guests/summary/summary.component';
import { AuthInterceptor } from './auth.interceptor';
import { TableComponent } from './guests/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    EventsComponent,
    AddComponent,
    GuestsComponent,
    SummaryComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
