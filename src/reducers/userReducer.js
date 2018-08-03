import {Record} from 'immutable';
import {LOGIN_USER_FULFILLED} from '../actions/userActions';

const UserState = Record({
  user: null
});

const initialState = new UserState();

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_FULFILLED:
      return state.set('user', action.user);
    default: {
      return state;
    }
  }
}
