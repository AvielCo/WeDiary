import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsService } from 'src/services/events.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EventsActions from '@store/actions/event.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Event } from 'src/models/event.model';
import { setAccessToken } from 'src/shared/access-token';

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
            return new EventsActions.AddEventSuccess(res.at);
          }),
          catchError((resError: HttpErrorResponse) => {
            let error;
            switch (resError.status) {
              case 401:
                error = 'You need to log in';
                break;
              case 403:
                error = 'You need to log in';
                break;
              default:
                error = 'Internal server error';
            }
            return of(new EventsActions.AddEventFail(error));
          })
        );
      })
    )
  );

  addEventsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.ADD_EVENT_SUCCESS),
      tap(
        (res: {
          payload: { accessToken: string; expireDate: number };
          type: string;
        }) => {
          setAccessToken(res.payload);
        }
      ),
      map((_) => new EventsActions.GetEventsStart())
    )
  );

  getEvents$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.GET_EVENTS_START),
      switchMap((events: EventsActions.GetEventsStart) => {
        return this.eventsService.fetchEvents().pipe(
          map((res) => {
            const { events, at } = res;
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
              at,
            });
          }),
          catchError((resError: HttpErrorResponse) => {
            let error;
            switch (resError.status) {
              case 401:
                error = 'You need to log in';
                break;
              case 403:
                error = 'You need to log in';
                break;
              default:
                error = 'Internal server error';
            }
            return of(new EventsActions.GetEventsFail(error));
          })
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
            payload: {
              events: Event[];
              at: { accessToken: string; expireDate: number };
            };
            type: string;
          }) => {
            setAccessToken(res.payload.at);
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
            return new EventsActions.RemoveEventSuccess(res.at);
          }),
          catchError((resError: HttpErrorResponse) => {
            let error;
            switch (resError.status) {
              case 401:
                error = 'You need to log in';
                break;
              case 403:
                error = 'You need to log in';
                break;
              default:
                error = 'Internal server error';
            }
            return of(new EventsActions.RemoveEventFail(error));
          })
        )
      )
    )
  );

  removeEventsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.REMOVE_EVENT_SUCCESS),
      tap(
        (res: {
          payload: { accessToken: string; expireDate: number };
          type: string;
        }) => {
          setAccessToken(res.payload);
        }
      ),
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
              return new EventsActions.UpdateEventSuccess(res.at);
            }),
            catchError((resError: HttpErrorResponse) => {
              let error;
              switch (resError.status) {
                case 401:
                  error = 'You need to log in';
                  break;
                case 403:
                  error = 'You need to log in';
                  break;
                default:
                  error = 'Internal server error';
              }
              return of(new EventsActions.UpdateEventFail(error));
            })
          )
      )
    )
  );

  updateEventsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(EventsActions.UPDATE_EVENT_SUCCESS),
      tap(
        (res: {
          payload: { accessToken: string; expireDate: number };
          type: string;
        }) => {
          setAccessToken(res.payload);
        }
      ),
      map((_) => new EventsActions.GetEventsStart())
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
