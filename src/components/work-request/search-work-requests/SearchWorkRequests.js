import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Form, FormGroup, Label, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class SearchWorkRequests extends Component {
  static propTypes = {
    workRequests: PropTypes.array,
    searchWorkRequests: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      query: ''
    };
  }

  handleChange = event => {
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSearch = () => {
    this.props.searchWorkRequests(this.state.query);
  };

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="query">Search:</Label>
                <Input onChange={this.handleChange} id="query" name="query"/>
              </FormGroup>
              <Button color="primary" onClick={this.handleSearch}>Search</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {this.props.workRequests.map((workRequest, k) => {
                return <ListGroupItem key={k}>
                  {workRequest.title}
                  <Link to={`/workRequest/${workRequest.id}`} className="float-right btn btn-primary"><i className="fa fa-arrow-right"/></Link>
                </ListGroupItem>;
              })}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}