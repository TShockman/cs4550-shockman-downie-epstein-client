import {Record} from 'immutable';
import {
  DELETE_LISTING_FULFILLED,
  DELETE_LISTING_REQUESTED,
  GET_ALL_LISTINGS_FULFILLED, GET_ALL_LISTINGS_REQUESTED,
  GET_LISTING_FULFILLED, GET_LISTING_REQUESTED,
  GET_USER_LISTINGS_FULFILLED, GET_USER_LISTINGS_REQUESTED, QUERY_LISTING_FULFILLED
} from '../actions/listingActions';

const ListingState = Record({
  listings: [], // list of listings
  currentListing: null, // the current listing
  currentListings: [],
  listingsSearchResult: []
});

const initialState = new ListingState();

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LISTINGS_REQUESTED: {
      return state.set('listings', []);
    }
    case GET_USER_LISTINGS_REQUESTED: {
      return state.set('currentListings', []);
    }
    case GET_LISTING_REQUESTED: {
      return state.set('currentListing', null);
    }
    case GET_LISTING_FULFILLED: {
      const newListings = state.listings.map(listing => listing.id === action.listing.id ? action.listing : listing);
      state = state.set('listings', newListings);
      return state.set('currentListing', action.listing);
    }
    case GET_ALL_LISTINGS_FULFILLED: {
      return state.set('listings', action.listings);
    }
    case GET_USER_LISTINGS_FULFILLED: {
      return state.set('currentListings', action.listings);
    }
    case DELETE_LISTING_FULFILLED: {
      const {lid} = action;
      state = state.set('listings', state.listings.filter(listing => listing.id !== lid));
      state = state.set('currentListings', state.currentListings.filter(listing => listing.id !== lid));
      state = state.set('currentListing', state.currentListing && state.currentListing.id === lid ? null : state.currentListing);
      return state;
    }
    case QUERY_LISTING_FULFILLED: {
      const {listings} = action;
      return state.set('listingsSearchResult', listings);
    }
    default: {
      return state;
    }
  }
}
