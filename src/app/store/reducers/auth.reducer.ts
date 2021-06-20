import * as Actions from '@store/actions/auth.actions';

export interface State {
  isModalOpen: boolean;
  isLoggedIn: boolean;
}

const initialState: State = {
  isModalOpen: false,
  isLoggedIn: false,
};

export function authReducer(
  state: State = initialState,
  action: Actions.AuthActions
): State {
  switch (action.type) {
    case Actions.OPEN_MODAL || Actions.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: (action as Actions.OpenModal | Actions.CloseModal).payload,
      };
    case Actions.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case Actions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
