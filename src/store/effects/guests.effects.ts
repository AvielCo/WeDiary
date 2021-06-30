import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestsService } from 'src/services/guests.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as GuestsActions from '@store/actions/guest.actions';
import { setAccessToken } from 'src/shared/access-token';
import { Guest } from 'src/models/guest.model';

@Injectable()
export class GuestEffects {
  addGuest$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.ADD_GUEST_START),
      switchMap((guestData: GuestsActions.AddGuestStart) => {
        const { guest, eventId } = guestData.payload!;
        return this.guestsService.postGuest(eventId, guest).pipe(
          map(
            (res) =>
              new GuestsActions.AddGuestSuccess({
                at: res.at,
                eventId: guestData.payload?.eventId,
              })
          ),
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
            return of(new GuestsActions.AddGuestFail(error));
          })
        );
      })
    )
  );
  addGuestsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.ADD_GUEST_SUCCESS),
      tap(
        (res: {
          payload: {
            at: { accessToken: string; expireDate: number };
            eventId: string;
          };
          type: string;
        }) => {
          setAccessToken(res.payload.at);
        }
      ),
      map((res) => new GuestsActions.GetGuestsStart(res.payload.eventId))
    )
  );

  getGuests$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.GET_GUESTS_START),
      switchMap((eventData: GuestsActions.GetGuestsStart) => {
        return this.guestsService.fetchGuests(eventData.payload).pipe(
          map((res) => {
            const { guests, at } = res;
            const guestList: Guest[] = [];
            for (const key in guests) {
              const guest = guests[key];
              guestList.push(
                new Guest(
                  guest.name,
                  guest.howMany,
                  guest.comment,
                  guest.howMuch,
                  guest._id
                )
              );
            }
            guestList.sort((a: Guest, b: Guest) => {
              if (a.name < b.name) {
                return -1;
              } else if (b.name < a.name) {
                return 1;
              }
              return 0;
            });
            return new GuestsActions.GetGuestsSuccess({
              guests: guestList,
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
            return of(new GuestsActions.GetGuestsFail(error));
          })
        );
      })
    )
  );
  getGuestsSuccess$: any = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(GuestsActions.GET_GUESTS_SUCCESS),
        tap(
          (res: {
            payload: {
              events: Guest[];
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

  removeGuest$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.REMOVE_GUEST_START),
      switchMap((guestData: GuestsActions.RemoveGuestStart) =>
        this.guestsService
          .removeGuest(guestData.payload.eventId, guestData.payload.guestId)
          .pipe(
            map((res) => {
              return new GuestsActions.RemoveGuestSuccess({
                at: res.at,
                eventId: guestData.payload.eventId,
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
              return of(new GuestsActions.RemoveGuestFail(error));
            })
          )
      )
    )
  );
  removeGuestsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.REMOVE_GUEST_SUCCESS),
      tap(
        (res: {
          payload: {
            at: { accessToken: string; expireDate: number };
            eventId: string;
          };
          type: string;
        }) => {
          setAccessToken(res.payload.at);
        }
      ),
      map((res) => new GuestsActions.GetGuestsStart(res.payload.eventId))
    )
  );

  updateGuest$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.UPDATE_GUEST_START),
      switchMap((guestData: GuestsActions.UpdateGuestStart) => {
        return this.guestsService
          .updateGuest(
            guestData.payload.eventId,
            guestData.payload.guestId,
            guestData.payload.update
          )
          .pipe(
            map((res) => {
              return new GuestsActions.UpdateGuestSuccess({
                at: res.at,
                eventId: guestData.payload.eventId,
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
              return of(new GuestsActions.UpdateGuestFail(error));
            })
          );
      })
    )
  );
  updateGuestsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.UPDATE_GUEST_SUCCESS),
      tap(
        (res: {
          payload: {
            at: { accessToken: string; expireDate: number };
            eventId: string;
          };
          type: string;
        }) => {
          setAccessToken(res.payload.at);
        }
      ),
      map((res) => new GuestsActions.GetGuestsStart(res.payload.eventId))
    )
  );

  constructor(
    private actions$: Actions,
    private guestsService: GuestsService
  ) {}
}
