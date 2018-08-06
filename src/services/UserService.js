import {LOGIN_URL, LOGOUT_URL, parseResponse, PROFILE_URL, USER_URL} from './api';

const _singleton = Symbol();

export default class UserService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new UserService(_singleton);
    }
    return this[_singleton];
  }

  register(user) {
    return fetch(USER_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(parseResponse);
  }

  login(user) {
    return fetch(LOGIN_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(parseResponse);
  }

  getProfile() {
    return fetch(PROFILE_URL, {
      method: 'GET',
      credentials: 'include'
    })
      .then(parseResponse);
  }

  logout() {
    return fetch(LOGOUT_URL, {
      method: 'post',
      credentials: 'include'
    }).then(response => response.ok);
  }

  deleteProfile() {
    return fetch(PROFILE_URL, {
      method: 'delete',
      credentials: 'include'
    }).then(response => response.ok);
  }
}