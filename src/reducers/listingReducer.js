import {Record} from 'immutable';
import {GET_ALL_LISTINGS_FULFILLED, GET_LISTING_FULFILLED} from '../actions/listingActions';

const ListingState = Record({
  listings: [], // list of listings
  currentListing: null // the current listing
});

const initialState = new ListingState();

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTING_FULFILLED: {
      const newListings = state.listings.map(listing => listing.id === action.listing.id ? action.listing : listing);
       state = state.set('listings', newListings);
      return state.set('currentListing', action.listing);
    }
    case GET_ALL_LISTINGS_FULFILLED: {
      return state.set('listings', action.listings);
    }
    default: {
      return state;
    }
  }
}
