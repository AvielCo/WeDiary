import { authReducer, AuthState } from '@store/reducers/auth.reducer';
import {
  eventsReducer,
  State as EventsState,
} from '@store/reducers/event.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  auth: AuthState;
  events: EventsState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
  events: eventsReducer,
};
