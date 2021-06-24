import { Guest } from 'src/models/guest.model';
import * as Actions from '@store/actions/guest.actions';

export interface State {
  isModalOpen: boolean;
  eventId?: string;

  loading: boolean;
  newGuest?: Guest;
  guests?: Guest[];
  guestToDelete?: string;
  guestToUpdate?: string;
  error?: string;
  actionType?: string;
}

const initialState: State = {
  isModalOpen: false,
  loading: true,
};

export function guestsReducer(
  state: State = initialState,
  action: Actions.GuestActions
): State {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        eventId: (action as Actions.OpenModalStart).payload.eventId,
      };
    case Actions.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        eventId: undefined,
      };
    case Actions.ADD_GUEST_START:
      return {
        ...state,
        newGuest: (action as Actions.AddGuestStart).payload?.guest,
        loading: true,
      };
    case Actions.ADD_GUEST_SUCCESS:
      return {
        ...state,
        newGuest: undefined,
        error: undefined,
        loading: false,
      };
    case Actions.ADD_GUEST_FAIL:
      return {
        ...state,
        newGuest: undefined,
        error: (action as Actions.AddGuestFail).payload,
        actionType: 'Guest add',
        loading: false,
      };
    case Actions.GET_GUESTS_START:
      return {
        ...state,
        loading: true,
      };
    case Actions.GET_GUESTS_SUCCESS:
      return {
        ...state,
        guests: (action as Actions.GetGuestsSuccess).payload.guests,
        error: undefined,
        loading: false,
      };
    case Actions.GET_GUESTS_FAIL:
      return {
        ...state,
        error: (action as Actions.GetGuestsFail).payload,
        actionType: 'Guest list',
        guests: undefined,
        loading: false,
      };
    case Actions.REMOVE_GUEST_START:
      return {
        ...state,
        guestToDelete: (action as Actions.RemoveGuestStart).payload.guestId,
        loading: true,
      };
    case Actions.REMOVE_GUEST_SUCCESS:
      return {
        ...state,
        guestToDelete: undefined,
        error: undefined,
        loading: false,
      };
    case Actions.REMOVE_GUEST_FAIL:
      return {
        ...state,
        guestToDelete: undefined,
        error: (action as Actions.RemoveGuestFail).payload,
        actionType: 'Guest remove',
        loading: false,
      };
    case Actions.UPDATE_GUEST_START:
      return {
        ...state,
        guestToUpdate: (action as Actions.UpdateGuestStart).payload.guestId,
        loading: true,
      };
    case Actions.UPDATE_GUEST_SUCCESS:
      return {
        ...state,
        guestToDelete: undefined,
        error: undefined,
        loading: false,
      };
    case Actions.UPDATE_GUEST_FAIL:
      return {
        ...state,
        guestToUpdate: undefined,
        error: (action as Actions.UpdateGuestFail).payload,
        actionType: 'Guest update',
        loading: false,
      };
    default:
      return state;
  }
}
