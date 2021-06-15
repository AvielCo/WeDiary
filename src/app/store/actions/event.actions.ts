import { Action } from '@ngrx/store';
import { Event } from 'src/app/events/event.model';

export const ADD_EVENT = 'ADD_EVENT';
export const GET_EVENTS = 'GET_EVENTS';

export class AddEvent implements Action {
  readonly type: string = ADD_EVENT;

  constructor(public payload?: Event) {}
}

export class GetEvents implements Action {
  readonly type: string = GET_EVENTS;

  constructor(public payload?: [Event]) {}
}

export type EventsActions = AddEvent | GetEvents;
