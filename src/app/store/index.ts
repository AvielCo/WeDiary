import { authReducer, State as AuthState } from '@store/reducers/auth.reducer';
import {
  eventsReducer,
  State as EventsState,
} from '@store/reducers/event.reducer';
import {
  guestsReducer,
  State as GuestState,
} from '@store/reducers/guest.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  auth: AuthState;
  events: EventsState;
  guests: GuestState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
  events: eventsReducer,
  guests: guestsReducer,
};
