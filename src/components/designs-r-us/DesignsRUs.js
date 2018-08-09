import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import ProviderWithRouter from './ProviderWithRouter';
import DesignsRUsNav from './DesignsRUsNav';

import Homepage from '../homepage/HomepageContainer';
import Register from '../register/RegisterContainer';
import Login from '../login/LoginContainer'
import Profile from '../profile/ProfileContainer';
import NewListing from '../listing/new-listing/NewListingContainer';
import Listing from '../listing/listing/ListingContainer';
import Listings from '../listing/listings/ListingsContainer';
import NewWorkRequest from '../work-request/new-work-request/NewWorkRequestContainer';
import WorkRequest from '../work-request/work-request/WorkRequestContainer';
import WorkRequests from '../work-request/work-requests/WorkRequestsContainer';

// import styling
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class DesignsRUs extends Component {

  render() {
    return (
      <Router>
        <ProviderWithRouter>
            <div>
              <DesignsRUsNav/>
              <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/listing/search" component={Listings}/>
                <Route exact path="/listing/new" component={NewListing}/>
                <Route path="/listing/:lid" component={Listing}/>
                <Route path="/workRequest/search" component={WorkRequests}/>
                <Route exact path="/workRequest/new" component={NewWorkRequest}/>
                <Route path="/workRequest/:lid" component={WorkRequest}/>
                <Redirect to="/"/>
              </Switch>
            </div>
        </ProviderWithRouter>
      </Router>
    )
  }
}