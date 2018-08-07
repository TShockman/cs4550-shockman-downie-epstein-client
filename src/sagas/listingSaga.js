import {takeEvery, takeLatest, put, fork, all, call, select} from 'redux-saga/effects';
import {
  CREATE_LISTING_FULFILLED,
  CREATE_LISTING_REQUESTED, GET_ALL_LISTINGS_FULFILLED, GET_ALL_LISTINGS_REQUESTED,
  GET_LISTING_FULFILLED,
  GET_LISTING_REQUESTED
} from '../actions/listingActions';
import ListingService from '../services/ListingService';
import {redirect} from '../actions/navigationActions';
import {selectUserState} from '../selectors/userSelector';

const listingService = ListingService.instance;


function * getListingSaga({lid}) {
  console.log('Getting listing:', lid);
  const listing = yield call(listingService.getListing, lid);

  if (listing) {
    yield put({type: GET_LISTING_FULFILLED, listing});
  } else {
    console.error('Failed to retrieve listing');
  }
}

function * createListingSaga({listing}) {
  console.log('Creating listing:', listing);
  const {user} = yield select(selectUserState);

  if (!user) {
    return console.error('Must be logged in to create a listing');
  }

  const newListing = yield call(listingService.createListingForUser, user, listing);

  if (newListing) {
    yield put({type: CREATE_LISTING_FULFILLED, listing: newListing});
    yield put(redirect(`/listing/${newListing.id}`));
  } else {
    console.error('Failed to create listing');
  }
}

function * getAllListingsSaga() {
  console.log('Getting all listings');

  const listings = yield call(listingService.getAllListings);

  if (listings) {
    yield put({type: GET_ALL_LISTINGS_FULFILLED, listings});
  } else {
    console.error('Failed to fetch listings');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeEvery, GET_LISTING_REQUESTED, getListingSaga),
    fork(takeEvery, CREATE_LISTING_REQUESTED, createListingSaga),
    fork(takeLatest, GET_ALL_LISTINGS_REQUESTED, getAllListingsSaga)
  ])
}