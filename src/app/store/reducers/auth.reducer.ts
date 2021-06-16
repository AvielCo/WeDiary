import * as Actions from '@store/actions/auth.actions';

export interface AuthState {
  isModalOpen: boolean;
}

const initialState: AuthState = {
  isModalOpen: false,
};

export function authReducer(
  state: AuthState = initialState,
  action: Actions.AuthActions
): AuthState {
  switch (action.type) {
    case Actions.OPEN_MODAL || Actions.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    default:
      return state;
  }
}
