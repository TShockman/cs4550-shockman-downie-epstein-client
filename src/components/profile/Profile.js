import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'reactstrap';
import Loading from '../common/Loading';
import {Link} from 'react-router-dom';

export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    deleteListing: PropTypes.func.isRequired,
    deleteWorkRequest: PropTypes.func.isRequired,
    deleteBlogPost: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getProfile();
  };

  getBlogPosts = () => {
    const {user, deleteBlogPost} = this.props;

    if (!user.blogPosts) {
      return <ListGroupItem><Loading/></ListGroupItem>;
    }

    return user.blogPosts.map(blogPost => (
      <ListGroupItem key={blogPost.id}>
        {blogPost.title}
        <span className="float-right">
          <Button color="danger" onClick={() => deleteBlogPost(blogPost.id)}><i className="fa fa-trash"/></Button>
          <Link to={`/blogPost/${blogPost.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
        </span>
      </ListGroupItem>
    ));
  };

  getWorkRequests = () => {
    const {user, deleteWorkRequest} = this.props;

    if (!user.workRequests) {
      return <ListGroupItem><Loading/></ListGroupItem>;
    }
    return user.workRequests.map(workRequest => (
      <ListGroupItem key={workRequest.id}>
        {workRequest.title}
        <span className="float-right">
          <Button color="danger" onClick={() => deleteWorkRequest(workRequest.id)}><i className="fa fa-trash"/></Button>
          <Link to={`/workRequest/${workRequest.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
        </span>
      </ListGroupItem>
    ));
  };

  getListings = () => {
    const {user, deleteListing} = this.props;

    if (!user.listings) {
      return <ListGroupItem><Loading/></ListGroupItem>;
    }

    return user.listings.map(listing => (
      <ListGroupItem key={listing.id}>
        {listing.title}
        <span className="float-right">
          <Button color="danger" onClick={() => deleteListing(listing.id)}><i className="fa fa-trash"/></Button>
          <Link to={`/listing/${listing.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
        </span>
      </ListGroupItem>
    ));
  };

  render() {
    const {user, logout, deleteAccount} = this.props;

    if (!user) {
      return <Loading/>;
    }

    return (
      <div className="container-fluid">
        <h2>Welcome {user.username}!</h2>
        <Row>
          <Col>
            <h3>User Actions</h3>
            Current Location: {this.props.user.city}
              <Button onClick={setLocation}>Set Location</Button>
            <Button onClick={logout}>Logout</Button>
            <Button color="danger" onClick={deleteAccount}>Delete Account</Button>
            <Link to="/profile/message" className="btn btn-primary">Messages</Link>
          </Col>
          {user.role === 'DESIGNER' &&
            <Col>
              <h3>My Listings</h3>
              <ListGroup>
                <ListGroupItem>
                  <Link to="/listing/new">Create New Listing</Link>
                </ListGroupItem>
                {this.getListings()}
              </ListGroup>
            </Col>
          }
          {user.role === 'CLIENT' &&
            <Col>
              <h3>My Work Requests</h3>
              <ListGroup>
                <ListGroupItem>
                  <Link to="/workRequest/new">Create New Work Request</Link>
                </ListGroupItem>
                {this.getWorkRequests()}
              </ListGroup>
            </Col>
          }
          {user.role === 'ADMIN' &&
          <Col>
            <h3>My Blog Posts</h3>
            <ListGroup>
              <ListGroupItem>
                <Link to="/blogPost/new">Create New Blog Post</Link>
              </ListGroupItem>
              {this.getBlogPosts()}
            </ListGroup>
          </Col>
          }
        </Row>
      </div>
    );
  }
}