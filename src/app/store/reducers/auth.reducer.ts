import * as Actions from '@store/actions/auth.actions';

export interface State {
  isModalOpen: boolean;
  accessToken?: string;
  error?: string;
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: State = {
  isModalOpen: false,
  loading: false,
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
    case Actions.LOGIN_START:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        accessToken: (action as Actions.LoginSuccess).payload,
      };
    case Actions.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: (action as Actions.LoginFailed).payload,
        accessToken: undefined,
      };
    case Actions.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case Actions.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case Actions.REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: (action as Actions.LoginFailed).payload,
      };
    case Actions.LOGOUT_START ||
      Actions.LOGOUT_SUCCESS ||
      Actions.LOGOUT_FAILED:
      return {
        ...state,
        error: undefined,
        accessToken: undefined,
      };
    case Actions.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: (action as Actions.SetIsLoggedIn).payload,
      };
    default:
      return state;
  }
}
