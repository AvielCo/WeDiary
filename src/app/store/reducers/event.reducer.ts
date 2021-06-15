import { Event } from 'src/app/events/event.model';
import * as Actions from '../actions/event.actions';

export interface State {
  newEvent?: Event;
  eventList?: [Event];
}

export interface AppState {
  eventsState: State;
}

const initialState: State = {
  newEvent: undefined,
  eventList: undefined,
};

export function eventsReducer(
  state: State = initialState,
  action: Actions.EventsActions
): State {
  switch (action.type) {
    case Actions.ADD_EVENT:
      return {
        ...state,
        newEvent: action.payload as Event,
      };
    case Actions.GET_EVENTS:
      return {
        ...state,
        eventList: action.payload as [Event],
      };
    default:
      return state;
  }
}
