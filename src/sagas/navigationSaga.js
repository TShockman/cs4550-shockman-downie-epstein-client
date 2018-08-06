import {takeEvery, put, fork, all, getContext} from 'redux-saga/effects';
import {REDIRECT} from '../actions/navigationActions';

function * redirectSaga({to}) {
  const browserHistory = yield getContext('routerHistory');
  browserHistory.push(to);
}

export default function * rootSaga () {
  yield all([
    fork(takeEvery, REDIRECT, redirectSaga),
  ])
}