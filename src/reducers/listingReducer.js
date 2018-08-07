import {Record} from 'immutable';
import {GET_LISTING_FULFILLED} from '../actions/listingActions';

const ListingState = Record({
  listings: {},
  currentListing: null
});

const initialState = new ListingState();

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTING_FULFILLED: {
      const newListings = state.listings;
      newListings[String(action.listing.id)] = action.listing;
      state = state.set('listings', newListings);
      return state.set('currentListing', action.listing);
    }
    default: {
      return state;
    }
  }
}
