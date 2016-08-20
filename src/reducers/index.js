import {combineReducers} from 'redux';
import login from './loginReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  login,
  session
});

export default rootReducer;
