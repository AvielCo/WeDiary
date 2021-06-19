import { Event } from 'src/models/event.model';
import { EventsService } from '@events/events.service';
import * as Actions from '@store/actions/event.actions';

export interface State {
  newEvent?: Event;
}

export interface AppState {
  eventsState: State;
}

const initialState: State = {
  newEvent: undefined,
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
    default:
      return state;
  }
}
