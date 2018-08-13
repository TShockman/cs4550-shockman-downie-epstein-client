import {combineReducers} from 'redux';

import userReducer from './userReducer';
import {NAME as USER_NAME} from '../actions/userActions';

import listingReducer from './listingReducer';
import {NAME as LISTING_NAME} from '../actions/listingActions';

import workRequestReducer from './workRequestReducer';
import {NAME as WORK_REQUEST_NAME} from '../actions/workRequestActions';

import blogPostReducer from './blogPostReducer';
import {NAME as BLOG_POST_NAME} from '../actions/blogPostActions';

import messageReducer from './messageReducer';
import {NAME as MESSAGE_NAME} from '../actions/messageActions';

export default combineReducers({
  [USER_NAME]: userReducer,
  [LISTING_NAME]: listingReducer,
  [WORK_REQUEST_NAME]: workRequestReducer,
  [BLOG_POST_NAME]: blogPostReducer,
  [MESSAGE_NAME]: messageReducer
});