import { Action } from '@ngrx/store';
import { Event } from 'src/models/event.model';

export const ADD_EVENT_START = '[Event] add event';
export const ADD_EVENT_SUCCESS = '[Event] add event success';
export const ADD_EVENT_FAIL = '[Event] add event failed';

export const GET_EVENTS_START = '[Event] get events';
export const GET_EVENTS_SUCCESS = '[Event] get events s';
export const GET_EVENTS_FAIL = '[Event] get events f';

export const REMOVE_EVENT_START = '[Event] remove event';
export const REMOVE_EVENT_SUCCESS = '[Event] remove event s';
export const REMOVE_EVENT_FAIL = '[Event] remove event f';

export const UPDATE_EVENT_START = '[Event] update event';
export const UPDATE_EVENT_SUCCESS = '[Event] update event s';
export const UPDATE_EVENT_FAIL = '[Event] update event f';

export class AddEventStart implements Action {
  readonly type: string = ADD_EVENT_START;

  constructor(public payload?: Event) {}
}
export class AddEventSuccess implements Action {
  readonly type: string = ADD_EVENT_SUCCESS;
  constructor(public payload: { accessToken: string; expireDate: number }) {} // accessToken
}
export class AddEventFail implements Action {
  readonly type: string = ADD_EVENT_FAIL;

  constructor(public payload: string) {} // error
}

export class GetEventsStart implements Action {
  readonly type: string = GET_EVENTS_START;
}
export class GetEventsSuccess implements Action {
  readonly type: string = GET_EVENTS_SUCCESS;
  constructor(
    public payload: {
      events: Event[];
      at: { accessToken: string; expireDate: number };
    }
  ) {}
}
export class GetEventsFail implements Action {
  readonly type: string = GET_EVENTS_FAIL;
  constructor(public payload: string) {} // error
}

export class RemoveEventStart implements Action {
  readonly type: string = REMOVE_EVENT_START;
  constructor(public payload: string) {} //event id
}
export class RemoveEventSuccess implements Action {
  readonly type: string = REMOVE_EVENT_SUCCESS;
  constructor(public payload: { accessToken: string; expireDate: number }) {} // accessToken
}
export class RemoveEventFail implements Action {
  readonly type: string = REMOVE_EVENT_FAIL;
  constructor(public payload: string) {} //error
}

export class UpdateEventStart implements Action {
  readonly type: string = UPDATE_EVENT_START;
  constructor(public payload: { eventId: string; update: {} }) {} //event id
}
export class UpdateEventSuccess implements Action {
  readonly type: string = UPDATE_EVENT_SUCCESS;
  constructor(public payload: { accessToken: string; expireDate: number }) {} //accessToken
}
export class UpdateEventFail implements Action {
  readonly type: string = UPDATE_EVENT_FAIL;
  constructor(public payload: string) {} //error
}

export type EventsActions =
  | AddEventStart
  | AddEventSuccess
  | AddEventFail
  | GetEventsStart
  | GetEventsSuccess
  | GetEventsFail
  | RemoveEventStart
  | RemoveEventSuccess
  | RemoveEventFail
  | UpdateEventStart
  | UpdateEventSuccess
  | UpdateEventFail;
