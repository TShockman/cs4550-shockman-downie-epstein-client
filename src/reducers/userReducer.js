import {Record} from 'immutable';
import {DELETE_PROFILE, GET_PROFILE_FULFILLED, LOGIN_USER_FULFILLED, LOGOUT} from '../actions/userActions';

const UserState = Record({
  user: null
});

const initialState = new UserState();

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FULFILLED:
    case GET_PROFILE_FULFILLED:
      return state.set('user', action.user);
    case LOGOUT:
    case DELETE_PROFILE:
      return state.set('user', null);
    default: {
      return state;
    }
  }
}
