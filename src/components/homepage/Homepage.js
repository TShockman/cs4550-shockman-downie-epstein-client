import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../utils';
import HERO_IMAGE from '../../images/Designs-R-Us.png'

export default class Homepage extends Component {
  static propTypes = {
    listings: PropTypes.array,
    workRequests: PropTypes.array,
    blogPosts: PropTypes.array,
    getListings: PropTypes.func.isRequired,
    getWorkRequests: PropTypes.func.isRequired,
    getBlogPosts: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getListings();
    this.props.getWorkRequests();
    this.props.getBlogPosts();
  };

  getBlogPosts() {
    const {blogPosts} = this.props;

    return (
      <ListGroup className="list-group">
        {blogPosts.slice(0,5).map(blogPost => (
          <ListGroupItem className="list-group-item " key={blogPost.id}>
            <strong>{blogPost.title}</strong>
            <span className="float-right">
              <span className="mr-2">{formatDate(blogPost.created)}</span>
              <Link to={`/blogPost/${blogPost.id}`}><i className="fa fa-arrow-right"/></Link>
            </span>
          </ListGroupItem>
        ))}
        <ListGroupItem className="list-group-item">
          <Link className="btn-outline-primary" to="/blogPost">All Blog Posts</Link>
        </ListGroupItem>
        <ListGroupItem className="list-group-item">
          <Link  className="btn-outline-primary" to="/blogPost/search">Search Blog Posts</Link>
        </ListGroupItem>
      </ListGroup>
    );
  }

  getListings() {
    const {listings} = this.props;

    return (
      <ListGroup className="list-group">
        {listings.slice(0,5).map(listing => (
          <ListGroupItem className="list-group-item" key={listing.id}>
            <strong>{listing.title}</strong>
            <span className="float-right">
              <span className="mr-2">{formatDate(listing.created)}</span>
              <Link to={`/listing/${listing.id}`}><i className="fa fa-arrow-right"/></Link>
            </span>
          </ListGroupItem>
          ))}
          <ListGroupItem className="list-group-item">
            <Link  className="btn-outline-primary" to="/listing">All Listings</Link>
          </ListGroupItem>
          <ListGroupItem className="list-group-item">
            <Link  className="btn-outline-primary" to="/listing/search">Search Listings</Link>
          </ListGroupItem>
      </ListGroup>
    );
  }

  getWorkRequests() {
    const {workRequests} = this.props;

    return (
      <ListGroup className="list-group">
        {workRequests.slice(0,5).map(workRequest => (
          <ListGroupItem className="list-group-item" key={workRequest.id}>
            <strong>{workRequest.title}</strong>
            <span className="float-right">
              <span className="mr-2">{formatDate(workRequest.created)}</span>
              <Link to={`/workRequest/${workRequest.id}`}><i className="fa fa-arrow-right"/></Link>
            </span>
          </ListGroupItem>
        ))}
        <ListGroupItem className="list-group-item">
          <Link  className="btn-outline-primary" to="/workRequest">All Work Requests</Link>
        </ListGroupItem>
        <ListGroupItem className="list-group-item">
          <Link  className="btn-outline-primary" to="/workRequest/search">Search Work Requests</Link>
        </ListGroupItem>
      </ListGroup>
    );
  }

  render() {
    return (
      <div className="container-fluid bg-light">
          <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
                  <img src={HERO_IMAGE} className="img-fluid " alt="Responsive image" />
              </div>
              <div className="col-sm-3"></div>

          </div>
        <Row>
          <Col>
            <h2>Listings</h2>
            {this.getListings()}
          </Col>
          <Col>
            <h2>Work Requests</h2>
            {this.getWorkRequests()}
          </Col>
          <Col>
            <h2>Blog Posts</h2>
            {this.getBlogPosts()}
          </Col>
        </Row>
      </div>
    );
  }
}