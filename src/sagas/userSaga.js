import {all, fork, select, call, put, takeLatest, getContext} from 'redux-saga/effects';
import {
  DELETE_PROFILE,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REQUESTED,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REQUESTED,
  LOGOUT,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_REQUESTED, UPDATE_PROFILE_FULFILLED, UPDATE_PROFILE_REQUESTED
} from '../actions/userActions';
import UserService from '../services/UserService';
import {redirect} from '../actions/navigationActions';

const userService = UserService.instance;

function * loginUser({user}) {
  console.log('Logging in user:', JSON.stringify(user, null, 2));
  const loggedIn = yield call(userService.login, user);

  if (loggedIn) {
    console.log('Successfully logged in user:', JSON.stringify(loggedIn, null, 2));

    // notify reducer
    yield put({type: LOGIN_USER_FULFILLED, user: loggedIn});

    console.log('Redirecting to profile');
    yield put(redirect('/profile'))
  } else {
    console.error('Failed to login user');
  }
}

function * registerUser({user}) {
  console.log('Registering user:', JSON.stringify(user, null, 2));
  const registered = yield call(userService.register, user);

  if (registered) {
    console.log('Successfully registered user:', JSON.stringify(registered, null, 2));
    yield put({type: REGISTER_USER_FULFILLED, user: registered});

    console.log('Redirecting to profile');
    yield put(redirect('/profile'))
  } else {
    console.error('Failed to register user');
  }
}

function * getProfile() {
  console.log('Getting user profile');
  const [profile, blogPosts, listings, workRequests] = yield all([
    call(userService.getProfile),
    call(userService.getProfileBlogPosts),
    call(userService.getProfileListings),
    call(userService.getProfileWorkRequests)
  ]);

  if (profile) {
    profile.blogPosts = blogPosts || [];
    profile.listings = listings || [];
    profile.workRequests = workRequests || [];
    console.log('Successfully retrieved user:', JSON.stringify(profile, null, 2));
    yield put({type: GET_PROFILE_FULFILLED, user: profile});
  } else {
    // if no profile, redirect to login after clearing user
    console.warn('Cannot get profile, user not logged in');
    yield put({type: GET_PROFILE_FULFILLED, user: null});
    yield put(redirect('/login'))
  }
}

function * logout() {
  console.log('Logging out');
  yield call(userService.logout);
  yield put(redirect('/login'));
}

function * deleteAccount() {
  console.log('Deleting account');
  yield call(userService.deleteProfile);
  yield put(redirect('/register'));
}

function * updateProfile({user}) {
  console.log('Updating profile:', user);

  const updated = yield call(userService.updateProfile, user);
  if (updated) {
    yield put({type: UPDATE_PROFILE_FULFILLED, user: updated});
    yield put({type: GET_PROFILE_REQUESTED});
    yield put(redirect('/profile'));
  } else {
    console.log('Failed to update profile');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeLatest, REGISTER_USER_REQUESTED, registerUser),
    fork(takeLatest, LOGIN_USER_REQUESTED, loginUser),
    fork(takeLatest, GET_PROFILE_REQUESTED, getProfile),
    fork(takeLatest, LOGOUT, logout),
    fork(takeLatest, DELETE_PROFILE, deleteAccount),
    fork(takeLatest, UPDATE_PROFILE_REQUESTED, updateProfile)
  ]);
}