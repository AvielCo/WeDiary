import { Event } from '@events/event.model';
import { Action } from '@ngrx/store';

export const OPEN_MODAL = 'OPEN_GUESTS_MODAL';
export const CLOSE_MODAL = 'CLOSE_GUESTS_MODAL';

export class OpenModal implements Action {
  readonly type: string = OPEN_MODAL;

  constructor(
    public payload: {
      toOpen: boolean;
      event: Event;
    }
  ) {}
}

export type GuestActions = OpenModal;
