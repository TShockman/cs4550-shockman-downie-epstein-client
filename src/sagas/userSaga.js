import {all, fork, select, call, put, takeLatest, getContext} from 'redux-saga/effects';
import {
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REQUESTED,
  REGISTER_USER_FULFILLED,
  REGISTER_USER_REQUESTED
} from '../actions/userActions';
import UserService from '../services/UserService';

const userService = UserService.instance;

function * loginUser({user}) {
  console.log('Logging in user:', JSON.stringify(user, null, 2));
  const loggedIn = yield call(userService.login, user);

  if (loggedIn) {
    console.log('Successfully logged in user:', JSON.stringify(loggedIn, null, 2));

    // notify reducer
    yield put({type: LOGIN_USER_FULFILLED, user: loggedIn});

    console.log('Redirecting to homepage');
    const browserHistory = yield getContext('routerHistory');
    browserHistory.push('/');
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

    console.log('Redirecting to homepage');
    const browserHistory = yield getContext('routerHistory');
    browserHistory.push('/');
  } else {
    console.error('Failed to register user');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeLatest, REGISTER_USER_REQUESTED, registerUser),
    fork(takeLatest, LOGIN_USER_REQUESTED, loginUser)
  ])
}