import {LISTING_URL, parseResponse, USER_URL} from './api';

const _singleton = Symbol();

export default class ListingService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new ListingService(_singleton);
    }
    return this[_singleton];
  }

  getAllListings() {
    return fetch(LISTING_URL)
      .then(parseResponse);
  }

  getAllListingsForUser(user) {
    return fetch(`${USER_URL}/${user.id}/listing`)
      .then(parseResponse);
  }

  createListingForUser(user, listing) {
    return fetch(`${USER_URL}/${user.id}/listing`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listing)
    })
      .then(parseResponse);
  }

  getListing(lid) {
    return fetch(`${LISTING_URL}/${lid}`)
      .then(parseResponse);
  }
}