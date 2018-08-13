import {BLOG_POST_URL, USER_URL, WORK_REQUEST_QUERY_URL, WORK_REQUEST_URL} from './api';
import {parseResponse} from '../utils';

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

  getWorkRequest(wrid) {
    return fetch(`${WORK_REQUEST_URL}/${wrid}`)
      .then(parseResponse);
  }

  deleteWorkRequest(wrid) {
    return fetch(`${WORK_REQUEST_URL}/${wrid}`, {
      method: 'delete'
    })
      .then(response => response.ok);
  }

  searchWorkRequests(query) {
    console.log('searching', query);
    return fetch(WORK_REQUEST_QUERY_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/text'
      },
      body: query
    }).then(parseResponse);
  }

  addComment(comment, wrid) {
    return fetch(`${WORK_REQUEST_URL}/${wrid}/comment`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(comment)
    }).then(parseResponse);
  }
}