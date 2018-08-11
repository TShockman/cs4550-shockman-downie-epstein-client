import {takeEvery, takeLatest, put, fork, all, call, select} from 'redux-saga/effects';
import {
  CREATE_L_COMMENT_FULFILLED, CREATE_L_COMMENT_REQUESTED,
  CREATE_LISTING_FULFILLED,
  CREATE_LISTING_REQUESTED, DELETE_L_COMMENT_FULFILLED, DELETE_L_COMMENT_REQUESTED,
  DELETE_LISTING_FULFILLED,
  DELETE_LISTING_REQUESTED,
  GET_ALL_LISTINGS_FULFILLED,
  GET_ALL_LISTINGS_REQUESTED,
  GET_LISTING_FULFILLED,
  GET_LISTING_REQUESTED,
  GET_USER_LISTINGS_FULFILLED,
  GET_USER_LISTINGS_REQUESTED, QUERY_LISTING_FULFILLED, QUERY_LISTING_REQUESTED
} from '../actions/listingActions';
import ListingService from '../services/ListingService';
import {redirect} from '../actions/navigationActions';
import {selectUserState} from '../selectors/userSelector';
import {GET_PROFILE_REQUESTED} from '../actions/userActions';
import CommentService from '../services/CommentService';


const listingService = ListingService.instance;
const commentService = CommentService.instance;

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

function * getUserListingsSaga({user}) {
  console.log('Getting listings for user:', user.id);

  const listings = yield call(listingService.getAllListingsForUser, user);

  if (listings) {
    yield put({type: GET_USER_LISTINGS_FULFILLED, listings});
  } else {
    console.error('Failed to retrieve listings');
  }
}

function * deleteListingSaga({lid}) {
  console.log('Deleting listing:', lid);

  const success = yield call(listingService.deleteListing, lid);

  if (success) {
    yield put({type: DELETE_LISTING_FULFILLED, lid});
    yield put({type: GET_PROFILE_REQUESTED});
  } else {
    console.error('Failed to delete listing');
  }
}

function * queryListingSaga({query}) {
  console.log('Querying listings:', query);

  const listings = yield call(listingService.searchListings, query);

  if (listings) {
    yield put({type: QUERY_LISTING_FULFILLED, listings});
  } else {
    console.error('Failed to query listings');
  }
}

function * createCommentSaga({comment, lid}) {
  console.log('Creating comment on listing:', comment, lid);

  const newComment = yield call(listingService.addComment, comment, lid);

  if (newComment) {
    yield put({type: CREATE_L_COMMENT_FULFILLED, comment: newComment});
    yield put({type: GET_LISTING_REQUESTED, lid});
  } else {
    console.error('Failed to create comment');
  }
}

function * deleteCommentSaga({cid, lid}) {
  console.log('Deleting comment from blog post', cid, lid);
  const deleted = yield call(commentService.deleteComment, cid);

  if (deleted) {
    yield put({type: DELETE_L_COMMENT_FULFILLED, cid, lid});
    yield put({type: GET_LISTING_REQUESTED, lid});
  } else {
    console.error('Failed to delete comment');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeEvery, GET_LISTING_REQUESTED, getListingSaga),
    fork(takeEvery, CREATE_LISTING_REQUESTED, createListingSaga),
    fork(takeLatest, GET_ALL_LISTINGS_REQUESTED, getAllListingsSaga),
    fork(takeLatest, GET_USER_LISTINGS_REQUESTED, getUserListingsSaga),
    fork(takeLatest, DELETE_LISTING_REQUESTED, deleteListingSaga),
    fork(takeLatest, QUERY_LISTING_REQUESTED, queryListingSaga),
    fork(takeEvery, DELETE_L_COMMENT_REQUESTED, deleteCommentSaga),
    fork(takeEvery, CREATE_L_COMMENT_REQUESTED, createCommentSaga)
  ])
}