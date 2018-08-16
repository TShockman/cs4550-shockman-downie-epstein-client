import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Form, FormGroup, Label, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../utils';
import Loading from '../../common/Loading';

export default class ListListings extends Component {
  static propTypes = {
    listings: PropTypes.array,
    getListings: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getListings();
  }

  render() {
    if (!this.props.listings) {
      return <Loading/>;
    }

    return (
      <Row>
        <Col>
          <ListGroup className="list-group">
            <ListGroupItem className="list-group-item">
              <Link className="btn btn-outline-info" to="/listing/search">Search Listings</Link>
            </ListGroupItem>
            {this.props.listings.map((listing, k) => {
              return <ListGroupItem key={k}>
                <strong>{listing.title}</strong>
                <span className="float-right">
                  <span className="mr-2">{formatDate(listing.created)}</span>
                  <Link to={`/listing/${listing.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
                </span>
              </ListGroupItem>
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}