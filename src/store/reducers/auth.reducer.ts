import * as Actions from '@store/actions/auth.actions';

export interface State {
  error?: string;
  actionType?: string;
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: State = {
  loading: false,
  isLoggedIn: false,
};

export function authReducer(
  state: State = initialState,
  action: Actions.AuthActions
): State {
  switch (action.type) {
    case Actions.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        isLoggedIn: true,
      };
    case Actions.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: (action as Actions.RegisterFailed).payload,
        actionType: 'login',
        isLoggedIn: false,
      };
    case Actions.REGISTER_START:
      return {
        ...state,
        loading: true,
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
        error: (action as Actions.RegisterFailed).payload,
        actionType: '[Register]',
      };
    case Actions.LOGOUT_START ||
      Actions.LOGOUT_SUCCESS ||
      Actions.LOGOUT_FAILED:
      return {
        ...state,
      };
    case Actions.SET_IS_LOGGED_IN:
      return {
        ...state,
        error: undefined,
        isLoggedIn: (action as Actions.SetIsLoggedIn).payload,
      };
    case Actions.TOKEN_VALIDATION_START:
      return {
        ...state,
      };
    case Actions.TOKEN_VALIDATION_SUCCESS:
      return {
        ...state,
        error: undefined,
      };
    case Actions.TOKEN_VALIDATION_FAILED:
      return {
        ...state,
        error: (action as Actions.RegisterFailed).payload,
        actionType: 'Authentication',
      };
    default:
      return state;
  }
}
