import * as Actions from '@store/actions/auth.actions';

export interface State {
  isModalOpen: boolean;
  token?: string;
}

const initialState: State = {
  isModalOpen: false,
  token: undefined,
};

export function authReducer(
  state: State = initialState,
  action: Actions.AuthActions
): State {
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
