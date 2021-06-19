import { Event } from 'src/models/event.model';
import * as Actions from '@store/actions/guest.actions';

export interface State {
  isModalOpen: boolean;
  event?: Event;
}

const initialState: State = {
  isModalOpen: false,
  event: undefined,
};

export function guestsReducer(
  state: State = initialState,
  action: Actions.GuestActions
): State {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: action.payload.toOpen,
        event: action.payload.event,
      };
    default:
      return state;
  }
}
