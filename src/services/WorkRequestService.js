import {parseResponse, USER_URL, WORK_REQUEST_URL} from './api';

const _singleton = Symbol();

export default class WorkRequestService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new WorkRequestService(_singleton);
    }
    return this[_singleton];
  }

  getAllWorkRequests() {
    return fetch(WORK_REQUEST_URL)
      .then(parseResponse);
  }

  getAllWorkRequestsForUser(user) {
    return fetch(`${USER_URL}/${user.id}/workRequest`)
      .then(parseResponse);
  }

  createWorkRequestForUser(user, workRequest) {
    return fetch(`${USER_URL}/${user.id}/workRequest`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workRequest)
    })
      .then(parseResponse);
  }

}