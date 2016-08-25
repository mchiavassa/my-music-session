import {combineReducers} from 'redux';
import login from './loginReducer';
import session from './sessionReducer';
import {loadingBarReducer} from 'react-redux-loading-bar';

const rootReducer = combineReducers({
  login,
  session,
  loadingBar: loadingBarReducer
});

export default rootReducer;
