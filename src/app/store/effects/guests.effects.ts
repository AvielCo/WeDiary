import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestsService } from '@guests/guests.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as GuestsActions from '@store/actions/guest.actions';
import { setAccessToken } from 'src/shared/set-access-token';
import { Guest } from 'src/models/guest.model';

@Injectable()
export class GuestEffects {
  openModal$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.OPEN_MODAL),
      map(
        (data: GuestsActions.OpenModalStart) =>
          new GuestsActions.GetGuestsStart(data.payload.eventId)
      )
    )
  );

  addGuest$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.ADD_GUEST_START),
      switchMap((guestData: GuestsActions.AddGuestStart) => {
        const { guest, eventId } = guestData.payload!;
        return this.guestsService.postGuest(eventId, guest).pipe(
          map((res) => {
            return new GuestsActions.AddGuestSuccess({
              accessToken: res.accessToken,
              eventId: guestData.payload?.eventId,
            });
          }),
          catchError((resError: HttpErrorResponse) =>
            of(new GuestsActions.AddGuestFail(resError.error.error.message))
          )
        );
      })
    )
  );

  addGuestsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.ADD_GUEST_SUCCESS),
      tap(
        (res: {
          payload: { accessToken: string; eventId: string };
          type: string;
        }) => {
          setAccessToken(res.payload.accessToken);
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
            const { guests, accessToken } = res;

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
              accessToken,
            });
          }),
          catchError((resError: HttpErrorResponse) =>
            of(new GuestsActions.GetGuestsFail(resError.error.error.message))
          )
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
            payload: { events: Guest[]; accessToken: string };
            type: string;
          }) => {
            setAccessToken(res.payload.accessToken);
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
                accessToken: res.accessToken,
                eventId: guestData.payload.eventId,
              });
            }),
            catchError((resError: HttpErrorResponse) =>
              of(
                new GuestsActions.RemoveGuestFail(resError.error.error.message)
              )
            )
          )
      )
    )
  );

  removeGuestsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.REMOVE_GUEST_SUCCESS),
      tap(
        (res: {
          payload: { accessToken: string; eventId: string };
          type: string;
        }) => {
          setAccessToken(res.payload.accessToken);
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
                accessToken: res.accessToken,
                eventId: guestData.payload.eventId,
              });
            }),
            catchError((resError: HttpErrorResponse) =>
              of(
                new GuestsActions.UpdateGuestFail(resError.error.error.message)
              )
            )
          );
      })
    )
  );

  updateGuestsSuccess$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(GuestsActions.UPDATE_GUEST_SUCCESS),
      tap(
        (res: {
          payload: { accessToken: string; eventId: string };
          type: string;
        }) => {
          setAccessToken(res.payload.accessToken);
        }
      ),
      map((res) => new GuestsActions.GetGuestsStart(res.payload.eventId))
    )
  );

  constructor(
    private actions$: Actions,
    private guestsService: GuestsService,
    private http: HttpClient
  ) {}
}
