import React, {Component} from 'react';
import HttpsRedirect from 'react-https-redirect';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import ProviderWithRouter from './ProviderWithRouter';
import DesignsRUsNav from './DesignsRUsNav';

import Homepage from '../homepage/HomepageContainer';
import Register from '../register/RegisterContainer';
import Login from '../login/LoginContainer'
import Profile from '../profile/ProfileContainer';
import NewListing from '../listing/new-listing/NewListingContainer';
import Listing from '../listing/listing/ListingContainer';
import Listings from '../listing/search-listings/SearchListingsContainer';
import NewWorkRequest from '../work-request/new-work-request/NewWorkRequestContainer';
import WorkRequest from '../work-request/work-request/WorkRequestContainer';
import WorkRequests from '../work-request/search-work-requests/SearchWorkRequestsContainer';
import NewBlogPost from '../blog-post/new-blog-post/NewBlogPostContainer';
import BlogPost from '../blog-post/blog-post/BlogPostContainer';
import BlogPosts from '../blog-post/search-blog-posts/SearchBlogPostsContainer';
import Messages from '../message/messages/MessagesContainer';
import Message from '../message/message/MessageContainer';
import NewMessage from '../message/new-message/NewMessageContainer';
import ListWorkRequests from '../work-request/list-work-requests/ListWorkRequestsContainer';
import ListListings from '../listing/list-listings/ListListingsContainer';
import ListBlogPosts from '../blog-post/list-blog-posts/ListBlogPostsContainer';
import UpdateWorkRequest from '../work-request/update-work-request/UpdateWorkRequestContainer';
import UpdateBlogPost from '../blog-post/update-blog-post/UpdateBlogPostContainer';
import UpdateListing from '../listing/update-listing/UpdateListingContainer';
import UpdateProfile from '../update-profile/UpdateProfileContainer';

// import styling
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class DesignsRUs extends Component {

  render() {
    return (
      <HttpsRedirect>
        <Router>
          <ProviderWithRouter>
            <div className="container-fluid">

              <DesignsRUsNav/>
              <Switch>
                <Route exact path="/" component={Homepage}/>

                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/profile/update" component={UpdateProfile}/>

                <Route exact path="/listing" component={ListListings}/>
                <Route path="/listing/search" component={Listings}/>
                <Route exact path="/listing/new" component={NewListing}/>
                <Route exact path="/listing/:lid" component={Listing}/>
                <Route exact path="/listing/:lid/update" component={UpdateListing}/>

                <Route exact path="/workRequest" component={ListWorkRequests}/>
                <Route path="/workRequest/search" component={WorkRequests}/>
                <Route exact path="/workRequest/new" component={NewWorkRequest}/>
                <Route exact path="/workRequest/:wrid" component={WorkRequest}/>
                <Route exact path="/workRequest/:wrid/update" component={UpdateWorkRequest}/>

                <Route exact path="/blogPost" component={ListBlogPosts}/>
                <Route path="/blogPost/search" component={BlogPosts}/>
                <Route exact path="/blogPost/new" component={NewBlogPost}/>
                <Route exact path="/blogPost/:bpid" component={BlogPost}/>
                <Route exact path="/blogPost/:bpid/update" component={UpdateBlogPost}/>

                <Route exact path="/profile/message" component={Messages}/>
                <Route exact path="/profile/message/new" component={NewMessage}/>
                <Route path="/profile/message/:mid" component={Message}/>
                <Redirect to="/"/>
              </Switch>
            </div>
          </ProviderWithRouter>
        </Router>
      </HttpsRedirect>
    )
  }
}