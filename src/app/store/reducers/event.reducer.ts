import { Event } from 'src/models/event.model';
import * as Actions from '@store/actions/event.actions';

export interface State {
  newEvent?: Event;
  error?: string;
}

export interface AppState {
  eventsState: State;
}

const initialState: State = {};

export function eventsReducer(
  state: State = initialState,
  action: Actions.EventsActions
): State {
  switch (action.type) {
    case Actions.START_ADD_EVENT:
      return {
        ...state,
        newEvent: (action as Actions.StartAddEvent).payload,
      };
    case Actions.ADD_EVENT_SUCCESS:
      return {
        ...state,
        error: undefined,
      };
    case Actions.ADD_EVENT_FAIL:
      return {
        ...state,
        error: (action as Actions.AddEventFail).payload,
      };
    default:
      return state;
  }
}
