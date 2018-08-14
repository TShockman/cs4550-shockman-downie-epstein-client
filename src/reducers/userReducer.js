import {Record} from 'immutable';
import {DELETE_PROFILE, GET_PROFILE_FULFILLED, LOGIN_USER_FULFILLED, LOGOUT} from '../actions/userActions';
import {DELETE_LISTING_FULFILLED} from '../actions/listingActions';
import {SET_USER_LOCATION_FULFILLED} from '../actions/googleApiActions'

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
    case DELETE_LISTING_FULFILLED: {
      const user = state.user;
      user.listings = user.listings.filter(listing => listing.id !== action.lid);
      return state.set('user', user);
    }
    case SET_USER_LOCATION_FULFILLED: return state.set('user', action.user);
    default: {
      return state;
    }
  }
}
