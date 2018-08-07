import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Homepage extends Component {
  static propTypes = {
    listings: PropTypes.array,
    workRequests: PropTypes.array,
    blogPosts: PropTypes.array,
    getListings: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getListings()
  };

  getListings() {
    const {listings} = this.props;

    return (
      <ListGroup>
        {listings.map(listing => (
          <ListGroupItem key={listing.id}>
            {listing.title}
            <Link to={`/listing/${listing.id}`} className="float-right"><i className="fa fa-arrow-right"/></Link>
          </ListGroupItem>
          ))}
      </ListGroup>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>Listings</h2>
            {this.getListings()}
          </Col>
          <Col>
            <h2>Work Requests</h2>
          </Col>
          <Col>
            <h2>Blog Posts</h2>
          </Col>
        </Row>
      </div>
    );
  }
}