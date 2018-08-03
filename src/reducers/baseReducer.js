import {combineReducers} from 'redux';

import userReducer from './userReducer';
import {NAME as USER_NAME} from '../actions/userActions';

export default combineReducers({
  [USER_NAME]: userReducer
});