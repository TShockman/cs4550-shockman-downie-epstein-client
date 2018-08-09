import {all, fork} from 'redux-saga/effects';
import userSaga from './userSaga';
import navigationSaga from './navigationSaga';
import listingSaga from './listingSaga';
import workRequestSaga from './workRequestSaga';
import blogPostSaga from './blogPostSaga';

export default function * baseSaga() {
  yield all([
    fork(userSaga),
    fork(navigationSaga),
    fork(listingSaga),
    fork(workRequestSaga),
    fork(blogPostSaga)
  ])
}