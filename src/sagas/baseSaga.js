import {all, fork} from 'redux-saga/effects';
import userSaga from './userSaga';
import navigationSaga from './navigationSaga';

export default function * baseSaga() {
  yield all([
    fork(userSaga),
    fork(navigationSaga)
  ])
}