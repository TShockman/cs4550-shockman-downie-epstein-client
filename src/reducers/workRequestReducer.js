import {Record} from 'immutable';
import {
  DELETE_WORK_REQUEST_FULFILLED,
  GET_ALL_WORK_REQUESTS_FULFILLED, GET_ALL_WORK_REQUESTS_REQUESTED,
  GET_WORK_REQUEST_FULFILLED, GET_WORK_REQUEST_REQUESTED,
  GET_USER_WORK_REQUESTS_FULFILLED, GET_USER_WORK_REQUESTS_REQUESTED, QUERY_WORK_REQUEST_FULFILLED
} from '../actions/workRequestActions';
import {createdSort} from '../utils';

const WorkRequestState = Record({
  workRequests: [], // list of workRequests
  currentWorkRequest: null, // the current workRequest
  currentWorkRequests: [],
  workRequestsSearchResult: []
});

const initialState = new WorkRequestState();

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WORK_REQUESTS_REQUESTED: {
      return state.set('workRequests', []);
    }
    case GET_USER_WORK_REQUESTS_REQUESTED: {
      return state.set('currentWorkRequests', []);
    }
    case GET_WORK_REQUEST_REQUESTED: {
      return state.set('currentWorkRequest', null);
    }
    case GET_WORK_REQUEST_FULFILLED: {
      const newWorkRequests = state.workRequests.map(workRequest => workRequest.id === action.workRequest.id ? action.workRequest : workRequest);
      state = state.set('workRequests', newWorkRequests);
      return state.set('currentWorkRequest', action.workRequest);
    }
    case GET_ALL_WORK_REQUESTS_FULFILLED: {
      const workRequests = action.workRequests;
      workRequests.sort(createdSort);
      return state.set('workRequests', workRequests);
    }
    case GET_USER_WORK_REQUESTS_FULFILLED: {
      return state.set('currentWorkRequests', action.workRequests);
    }
    case DELETE_WORK_REQUEST_FULFILLED: {
      const {wrid} = action;
      state = state.set('workRequests', state.workRequests.filter(workRequest => workRequest.id !== wrid));
      state = state.set('currentWorkRequests', state.currentWorkRequests.filter(workRequest => workRequest.id !== wrid));
      state = state.set('currentWorkRequest', state.currentWorkRequest && state.currentWorkRequest.id === wrid ? null : state.currentWorkRequest);
      return state;
    }
    case QUERY_WORK_REQUEST_FULFILLED: {
      const {workRequests} = action;
      return state.set('workRequestsSearchResult', workRequests);
    }
    default: {
      return state;
    }
  }
}
