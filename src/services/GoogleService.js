import {LOCATION_SET_URL} from './api';
import {parseResponse} from '../utils';

const _singleton = Symbol();

export default class GoogleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly');
        }
    }

    static get instance() {
        if (!this[_singleton]) {
            this[_singleton] = new GoogleService(_singleton);
        }
        return this[_singleton];
    }

    getLocation() {
       return fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA9B_NWvRG5VQDadmV4nggptVb3ezrpvn0", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(parseResponse);

    }

    getCity(locObj) {
        return fetch("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA9B_NWvRG5VQDadmV4nggptVb3ezrpvn0&latlng=" + locObj.lat + "," + locObj.lng)
            .then(parseResponse)
    }

    setLocation(lat, lng, city) {
        return fetch(LOCATION_SET_URL + '/' + city + '/' + lat + '/' + lng, {
            credentials: 'include',
            method: 'put'
        })
            .then(parseResponse)
    }
}