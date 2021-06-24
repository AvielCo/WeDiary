import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsService } from '@events/events.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EventsActions from '@store/actions/event.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Event } from 'src/models/event.model';
import { setAccessToken } from 'src/shared/set-access-token';

@Injectable()
export class EventEffects {
  addEvent$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.ADD_EVENT_START),
      switchMap((eventData: EventsActions.AddEventStart) => {
        const { date, location, firstPerson, secondPerson } =
          eventData.payload!;
        const event = new Event(date, location, firstPerson, secondPerson);
        return this.eventsService.postEvent(event).pipe(
          map((res) => {
            return new EventsActions.AddEventSuccess(res.accessToken);
          }),
          catchError((resError: HttpErrorResponse) =>
            of(new EventsActions.AddEventFail(resError.error.error.message))
          )
        );
      })
    )
  );

  addEventsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.ADD_EVENT_SUCCESS),
      tap((res: { payload: string; type: string }) => {
        setAccessToken(res.payload);
      }),
      map((_) => new EventsActions.GetEventsStart())
    )
  );

  getEvents$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.GET_EVENTS_START),
      switchMap((events: EventsActions.GetEventsStart) => {
        return this.eventsService.fetchEvents().pipe(
          map((res) => {
            const { events, accessToken } = res;
            const eventList: Event[] = [];
            for (const key in events) {
              const event = events[key];
              eventList.push(
                new Event(
                  event.date,
                  event.location,
                  event.firstPerson,
                  event.secondPerson,
                  event._id,
                  event.guests
                )
              );
            }
            eventList.sort(
              (a: Event, b: Event) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            return new EventsActions.GetEventsSuccess({
              events: eventList,
              accessToken,
            });
          }),
          catchError((resError: HttpErrorResponse) =>
            of(new EventsActions.GetEventsFail(resError.error.error.message))
          )
        );
      })
    )
  );

  getEventsSuccess$: any = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(EventsActions.GET_EVENTS_SUCCESS),
        tap(
          (res: {
            payload: { events: Event[]; accessToken: string };
            type: string;
          }) => {
            setAccessToken(res.payload.accessToken);
          }
        )
      ),
    { dispatch: false }
  );

  removeEvent$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.REMOVE_EVENT_START),
      switchMap((event: EventsActions.RemoveEventStart) =>
        this.eventsService.removeEvent(event.payload).pipe(
          map((res) => {
            return new EventsActions.RemoveEventSuccess(res.accessToken);
          }),
          catchError((resError: HttpErrorResponse) =>
            of(new EventsActions.RemoveEventFail(resError.error.error.message))
          )
        )
      )
    )
  );

  removeEventsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.REMOVE_EVENT_SUCCESS),
      tap((res: { payload: string; type: string }) => {
        setAccessToken(res.payload);
      }),
      map((_) => new EventsActions.GetEventsStart())
    )
  );

  updateEvent$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.UPDATE_EVENT_START),
      switchMap((event: EventsActions.UpdateEventStart) =>
        this.eventsService
          .updateEvent(event.payload.eventId, event.payload.update)
          .pipe(
            map((res) => {
              return new EventsActions.UpdateEventSuccess(res.accessToken);
            }),
            catchError((resError: HttpErrorResponse) =>
              of(
                new EventsActions.UpdateEventFail(resError.error.error.message)
              )
            )
          )
      )
    )
  );

  updateEventsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.UPDATE_EVENT_SUCCESS),
      tap((res: { payload: string; type: string }) => {
        setAccessToken(res.payload);
      }),
      map((_) => new EventsActions.GetEventsStart())
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
