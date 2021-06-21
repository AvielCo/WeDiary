import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsService } from '@events/events.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EventsActions from '@store/actions/event.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Event } from 'src/models/event.model';

@Injectable()
export class EventEffects {
  addEvent$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.START_ADD_EVENT),
      switchMap((eventData: EventsActions.StartAddEvent) => {
        const { date, location, firstPerson, secondPerson } =
          eventData.payload!;
        const event = new Event(date, location, firstPerson, secondPerson);
        return this.eventsService.postEvent(event).pipe(
          map((res) => {
            return new EventsActions.AddEventSuccess();
          }),
          catchError((resError: HttpErrorResponse) => {
            return of(
              new EventsActions.AddEventFail(resError.error.error.message)
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private http: HttpClient
  ) {}
}
