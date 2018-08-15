import {all, fork, select, call, put, takeLatest, getContext} from 'redux-saga/effects';
import {
    GET_USER_LOCATION_REQUESTED,
    GET_USER_LOCATION_FULFILLED,
    SET_USER_LOCATION_REQUESTED,
    SET_USER_LOCATION_FULFILLED
} from '../actions/googleApiActions';
import googleService from '../services/GoogleService'
import {GET_PROFILE_REQUESTED} from '../actions/userActions';

const service = googleService.instance;


function *  getLocation() {
    console.log('Using google maps API to get current location');
    const location = yield call(service.getLocation);

    if (location) {
        console.log('successfully got location' + JSON.stringify(location.location));

        const revGeo = yield call(service.getCity, location.location)
        if (revGeo) {
          const cityName = revGeo.results[0].address_components[2].long_name.split("/")[0];

          console.log("successfully backtraced geolocation" + cityName);

            const finalProduct = yield call(service.setLocation, location.location.lat, location.location.lng, cityName);
            if (finalProduct) {
                console.log("saved location in DB" + finalProduct);
                yield put({type: SET_USER_LOCATION_FULFILLED, user: finalProduct});
                yield put({type: GET_PROFILE_REQUESTED});
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