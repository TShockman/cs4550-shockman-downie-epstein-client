import {takeEvery, takeLatest, put, fork, all, call, select} from 'redux-saga/effects';
import {
  CREATE_WORK_REQUEST_FULFILLED,
  CREATE_WORK_REQUEST_REQUESTED,
  DELETE_WORK_REQUEST_FULFILLED,
  DELETE_WORK_REQUEST_REQUESTED,
  GET_ALL_WORK_REQUESTS_FULFILLED,
  GET_ALL_WORK_REQUESTS_REQUESTED,
  GET_WORK_REQUEST_FULFILLED,
  GET_WORK_REQUEST_REQUESTED,
  GET_USER_WORK_REQUESTS_FULFILLED,
  GET_USER_WORK_REQUESTS_REQUESTED, QUERY_WORK_REQUEST_FULFILLED, QUERY_WORK_REQUEST_REQUESTED
} from '../actions/workRequestActions';
import WorkRequestService from '../services/WorkRequestService';
import {redirect} from '../actions/navigationActions';
import {selectUserState} from '../selectors/userSelector';
import {GET_PROFILE_REQUESTED} from '../actions/userActions';

const workRequestService = WorkRequestService.instance;


function * getWorkRequestSaga({wrid}) {
  console.log('Getting workRequest:', wrid);
  const workRequest = yield call(workRequestService.getWorkRequest, wrid);

  if (workRequest) {
    yield put({type: GET_WORK_REQUEST_FULFILLED, workRequest});
  } else {
    console.error('Failed to retrieve workRequest');
  }
}

function * createWorkRequestSaga({workRequest}) {
  console.log('Creating workRequest:', workRequest);
  const {user} = yield select(selectUserState);

  if (!user) {
    return console.error('Must be logged in to create a workRequest');
  }

  const newWorkRequest = yield call(workRequestService.createWorkRequestForUser, user, workRequest);

  if (newWorkRequest) {
    yield put({type: CREATE_WORK_REQUEST_FULFILLED, workRequest: newWorkRequest});
    yield put(redirect(`/workRequest/${newWorkRequest.id}`));
  } else {
    console.error('Failed to create workRequest');
  }
}

function * getAllWorkRequestsSaga() {
  console.log('Getting all workRequests');

  const workRequests = yield call(workRequestService.getAllWorkRequests);

  if (workRequests) {
    yield put({type: GET_ALL_WORK_REQUESTS_FULFILLED, workRequests});
  } else {
    console.error('Failed to fetch workRequests');
  }
}

function * getUserWorkRequestsSaga({user}) {
  console.log('Getting workRequests for user:', user.id);

  const workRequests = yield call(workRequestService.getAllWorkRequestsForUser, user);

  if (workRequests) {
    yield put({type: GET_USER_WORK_REQUESTS_FULFILLED, workRequests});
  } else {
    console.error('Failed to retrieve workRequests');
  }
}

function * deleteWorkRequestSaga({wrid}) {
  console.log('Deleting workRequest:', wrid);

  const success = yield call(workRequestService.deleteWorkRequest, wrid);

  if (success) {
    yield put({type: DELETE_WORK_REQUEST_FULFILLED, wrid});
    yield put({type: GET_PROFILE_REQUESTED});
  } else {
    console.error('Failed to delete workRequest');
  }
}

function * queryWorkRequestSaga({query}) {
  console.log('Querying workRequests:', query);

  const workRequests = yield call(workRequestService.searchWorkRequests, query);

  if (workRequests) {
    yield put({type: QUERY_WORK_REQUEST_FULFILLED, workRequests});
  } else {
    console.error('Failed to query workRequests');
  }
}

export default function * rootSaga () {
  yield all([
    fork(takeEvery, GET_WORK_REQUEST_REQUESTED, getWorkRequestSaga),
    fork(takeEvery, CREATE_WORK_REQUEST_REQUESTED, createWorkRequestSaga),
    fork(takeLatest, GET_ALL_WORK_REQUESTS_REQUESTED, getAllWorkRequestsSaga),
    fork(takeLatest, GET_USER_WORK_REQUESTS_REQUESTED, getUserWorkRequestsSaga),
    fork(takeLatest, DELETE_WORK_REQUEST_REQUESTED, deleteWorkRequestSaga),
    fork(takeLatest, QUERY_WORK_REQUEST_REQUESTED, queryWorkRequestSaga)
  ])
}