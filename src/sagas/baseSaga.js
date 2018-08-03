import {all, fork} from 'redux-saga/effects';
import userSaga from './userSaga';

export default function * baseSaga() {
  yield all([
    fork(userSaga)
  ])
}