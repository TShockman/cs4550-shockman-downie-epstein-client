import {all, fork, select, call, put, takeLatest, getContext} from 'redux-saga/effects';
import {
    GET_USER_LOCATION_REQUESTED,
    GET_USER_LOCATION_FULFILLED,
    SET_USER_LOCATION_REQUESTED,
    SET_USER_LOCATION_FULFILLED
} from '../actions/googleApiActions';
import googleService from '../services/GoogleService'

const service = googleService.instance;


function *  getLocation() {
    console.log('Using google maps API to get current location');
    const location = yield call(service.getLocation);

    if (location) {
        console.log('successfully got location' + location.location);

        const revGeo = yield call(service.getCity, location.location)
        if (revGeo) {
            console.log("successfully backtraced geolocation" + revGeo.results.address_components[2]);

            const finalProduct = yield call(service.setLocation, location.location.lat, location.location.lng, revGeo.results.address_components[2]);
            if (finalProduct) {
                console.log("saved location in DB" + finalProduct);
                yield put({type: SET_USER_LOCATION_FULFILLED, user: finalProduct});
            } else {
                console.log("could not save location in db for some reason");
            }
        } else {
            console.log("cannot backtrack geolocation")
        }
    } else {
        console.log('Failed to get Location')
    }
}

export default function * rootSaga () {
    yield all([
        fork(takeLatest,SET_USER_LOCATION_REQUESTED, getLocation)
    ])}