import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {
  switch(action.type) {
    case types.LOGIN_RECEIVE_AUTHENTICATION_URL:
      return Object.assign({}, state, {authUrl: action.url});

    case types.LOGIN_RECEIVE_USER:
      return Object.assign({}, state, {user: action.user, token: action.token, isAuthenticated: true});

    default:
      return state;
  }
}
