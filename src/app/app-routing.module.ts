import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@auth/auth.component';
import { EventsComponent } from '@events/events.component';
import { ModalContainerComponent } from 'src/shared/modal-container/modal-container.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  {
    path: 'events',
    canActivate: [AuthGuard],
    component: EventsComponent,
    children: [
      { path: 'add', component: ModalContainerComponent },
      {
        path: ':eventId/guests',
        component: ModalContainerComponent,
      },
    ],
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
