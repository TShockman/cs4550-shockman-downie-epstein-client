import {combineReducers} from 'redux';

import userReducer from './userReducer';
import {NAME as USER_NAME} from '../actions/userActions';

import listingReducer from './listingReducer';
import {NAME as LISTING_NAME} from '../actions/listingActions';

export default combineReducers({
  [USER_NAME]: userReducer,
  [LISTING_NAME]: listingReducer
});