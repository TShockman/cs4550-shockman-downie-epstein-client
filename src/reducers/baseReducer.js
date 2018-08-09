import {combineReducers} from 'redux';

import userReducer from './userReducer';
import {NAME as USER_NAME} from '../actions/userActions';

import listingReducer from './listingReducer';
import {NAME as LISTING_NAME} from '../actions/listingActions';

import workRequestReducer from './workRequestReducer';
import {NAME as WORK_REQUEST_NAME} from '../actions/workRequestActions';

export default combineReducers({
  [USER_NAME]: userReducer,
  [LISTING_NAME]: listingReducer,
  [WORK_REQUEST_NAME]: workRequestReducer
});