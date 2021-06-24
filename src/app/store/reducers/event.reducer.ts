import { Event } from 'src/models/event.model';
import * as Actions from '@store/actions/event.actions';

export interface State {
  loading: boolean;
  newEvent?: Event;
  events?: Event[];
  eventToDelete?: string;
  eventToUpdate?: string;
  error?: string;
  actionType?: string;
}

export interface AppState {
  eventsState: State;
}

const initialState: State = {
  loading: true,
};

export function eventsReducer(
  state: State = initialState,
  action: Actions.EventsActions
): State {
  switch (action.type) {
    case Actions.ADD_EVENT_START:
      return {
        ...state,
        newEvent: (action as Actions.AddEventStart).payload,
        loading: true,
      };
    case Actions.ADD_EVENT_SUCCESS:
      return {
        ...state,
        error: undefined,
        newEvent: undefined,
        loading: false,
      };
    case Actions.ADD_EVENT_FAIL:
      return {
        ...state,
        error: (action as Actions.AddEventFail).payload,
        newEvent: undefined,
        actionType: 'Event add',
        loading: false,
      };

    case Actions.GET_EVENTS_START:
      return {
        ...state,
        loading: true,
      };
    case Actions.GET_EVENTS_SUCCESS:
      return {
        ...state,
        error: undefined,
        events: (action as Actions.GetEventsSuccess).payload.events,
        loading: false,
      };
    case Actions.GET_EVENTS_FAIL:
      return {
        ...state,
        error: (action as Actions.GetEventsFail).payload,
        events: undefined,
        actionType: 'Event list',
        loading: false,
      };

    case Actions.REMOVE_EVENT_START:
      return {
        ...state,
        eventToDelete: (action as Actions.RemoveEventStart).payload,
        loading: true,
      };
    case Actions.REMOVE_EVENT_SUCCESS:
      return {
        ...state,
        eventToDelete: undefined,
        error: undefined,
        loading: false,
      };
    case Actions.REMOVE_EVENT_FAIL:
      return {
        ...state,
        eventToDelete: undefined,
        error: (action as Actions.RemoveEventFail).payload,
        actionType: 'Event remove',
        loading: false,
      };

    case Actions.UPDATE_EVENT_START:
      return {
        ...state,
        eventToUpdate: (action as Actions.UpdateEventStart).payload.eventId,
        loading: true,
      };
    case Actions.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        eventToDelete: undefined,
        error: undefined,
        loading: false,
      };
    case Actions.UPDATE_EVENT_FAIL:
      return {
        ...state,
        eventToUpdate: undefined,
        error: (action as Actions.UpdateEventFail).payload,
        actionType: 'Event update',
        loading: false,
      };
    default:
      return state;
  }
}
