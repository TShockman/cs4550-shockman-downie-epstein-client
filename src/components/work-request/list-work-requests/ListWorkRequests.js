import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Form, FormGroup, Label, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../utils';
import Loading from '../../common/Loading';

export default class ListWorkRequests extends Component {
  static propTypes = {
    workRequests: PropTypes.array,
    getWorkRequests: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getWorkRequests();
  }

  render() {
    if (!this.props.workRequests) {
      return <Loading/>;
    }

    return (
      <Row>
        <Col>
          <ListGroup className="list-group-item-action">
            <ListGroupItem className="list-group-item-action">
              <Link to="/workRequest/search">Search Work Requests</Link>
            </ListGroupItem>
            {this.props.workRequests.map((workRequest, k) => {
              return <ListGroupItem className="list-group-item-action" key={k}>
                <strong>{workRequest.title}</strong>
                <span className="float-right">
                  <span className="mr-2">{formatDate(workRequest.created)}</span>
                  <Link to={`/workRequest/${workRequest.id}`} className="btn btn-primary"><i className="fa fa-arrow-right"/></Link>
                </span>
              </ListGroupItem>
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}