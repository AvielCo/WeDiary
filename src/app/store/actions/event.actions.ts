import { Action } from '@ngrx/store';
import { Event } from 'src/models/event.model';

export const START_ADD_EVENT = '[Event] add event';
export const ADD_EVENT_SUCCESS = '[Event] add event success';
export const ADD_EVENT_FAIL = '[Event] add event failed';
export const GET_EVENTS = '[Event] get events';

export class StartAddEvent implements Action {
  readonly type: string = START_ADD_EVENT;

  constructor(public payload?: Event) {}
}

export class AddEventSuccess implements Action {
  readonly type: string = ADD_EVENT_SUCCESS;
}

export class AddEventFail implements Action {
  readonly type: string = ADD_EVENT_FAIL;

  constructor(public payload: string) {}
}

export class GetEvents implements Action {
  readonly type: string = GET_EVENTS;

  constructor(public payload?: [Event]) {}
}

export type EventsActions =
  | StartAddEvent
  | AddEventSuccess
  | AddEventFail
  | GetEvents;
