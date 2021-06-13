import { authReducer, AuthState } from './reducers/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
};
