import { Event } from 'src/models/event.model';
import { Action } from '@ngrx/store';

export const OPEN_MODAL = '[Guest] open modal';
export const CLOSE_MODAL = '[Guest] close modal';

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
