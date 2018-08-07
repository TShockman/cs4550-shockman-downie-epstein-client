import {LISTING_QUERY_URL, LISTING_URL, parseResponse, USER_URL} from './api';

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

  deleteListing(lid) {
    return fetch(`${LISTING_URL}/${lid}`, {
      method: 'delete'
    })
      .then(response => response.ok);
  }

  searchListings(query) {
    console.log('searching', query);
    return fetch(LISTING_QUERY_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/text'
      },
      body: query
    }).then(parseResponse);
  }
}