import { Guest } from 'src/models/guest.model';
import { Action } from '@ngrx/store';

export const OPEN_MODAL = '[Guest] open modal';

export const CLOSE_MODAL = '[Guest] close modal';

export const ADD_GUEST_START = '[Guest] add guest';
export const ADD_GUEST_SUCCESS = '[Guest] add guest success';
export const ADD_GUEST_FAIL = '[Guest] add guest failed';

export const GET_GUESTS_START = '[Guest] get guests';
export const GET_GUESTS_SUCCESS = '[Guest] get guests s';
export const GET_GUESTS_FAIL = '[Guest] get guests f';

export const REMOVE_GUEST_START = '[Guest] remove guest';
export const REMOVE_GUEST_SUCCESS = '[Guest] remove guest s';
export const REMOVE_GUEST_FAIL = '[Guest] remove guest f';

export const UPDATE_GUEST_START = '[Guest] update guest';
export const UPDATE_GUEST_SUCCESS = '[Guest] update guest s';
export const UPDATE_GUEST_FAIL = '[Guest] update guest f';

export class OpenModalStart implements Action {
  readonly type: string = OPEN_MODAL;

  constructor(
    public payload: {
      toOpen: boolean;
      eventId: string;
    }
  ) {}
}

export class CloseModal implements Action {
  readonly type: string = CLOSE_MODAL;

  constructor(
    public payload: {
      toOpen: boolean;
      eventId?: string;
    }
  ) {}
}

export class AddGuestStart implements Action {
  readonly type: string = ADD_GUEST_START;

  constructor(public payload: { guest: Guest; eventId: string }) {}
}

export class AddGuestSuccess implements Action {
  readonly type: string = ADD_GUEST_SUCCESS;
  constructor(public payload: { accessToken: string; eventId: string }) {} // accessToken
}

export class AddGuestFail implements Action {
  readonly type: string = ADD_GUEST_FAIL;

  constructor(public payload: string) {} // error
}

export class GetGuestsStart implements Action {
  readonly type: string = GET_GUESTS_START;
  constructor(public payload: string) {}
}

export class GetGuestsSuccess implements Action {
  readonly type: string = GET_GUESTS_SUCCESS;
  constructor(public payload: { guests: Guest[]; accessToken: string }) {}
}

export class GetGuestsFail implements Action {
  readonly type: string = GET_GUESTS_FAIL;
  constructor(public payload: string) {} // error
}

export class RemoveGuestStart implements Action {
  readonly type: string = REMOVE_GUEST_START;
  constructor(public payload: { guestId: string; eventId: string }) {}
}

export class RemoveGuestSuccess implements Action {
  readonly type: string = REMOVE_GUEST_SUCCESS;
  constructor(public payload: { accessToken: string; eventId: string }) {} // accessToken
}

export class RemoveGuestFail implements Action {
  readonly type: string = REMOVE_GUEST_FAIL;
  constructor(public payload: string) {} //error
}

export class UpdateGuestStart implements Action {
  readonly type: string = UPDATE_GUEST_START;
  constructor(
    public payload: { guestId: string; eventId: string; update: {} }
  ) {}
}

export class UpdateGuestSuccess implements Action {
  readonly type: string = UPDATE_GUEST_SUCCESS;
  constructor(public payload: { accessToken: string; eventId: string }) {} //accessToken
}

export class UpdateGuestFail implements Action {
  readonly type: string = UPDATE_GUEST_FAIL;
  constructor(public payload: string) {} //error
}

export type GuestActions =
  | OpenModalStart
  | CloseModal
  | AddGuestStart
  | AddGuestSuccess
  | AddGuestFail
  | GetGuestsStart
  | GetGuestsSuccess
  | GetGuestsFail
  | RemoveGuestStart
  | RemoveGuestSuccess
  | RemoveGuestFail
  | UpdateGuestStart
  | UpdateGuestSuccess
  | UpdateGuestFail;
