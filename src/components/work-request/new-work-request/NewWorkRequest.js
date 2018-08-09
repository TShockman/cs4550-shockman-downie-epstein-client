import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom';

export default class NewWorkRequest extends Component {
  static propTypes = {
    user: PropTypes.object,
    createWorkRequest: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      title: '',
      description: ''
    };
  }

  handleFormUpdate = event => {
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {createWorkRequest} = this.props;
    const {title, description} = this.state;

    createWorkRequest({
      title,
      description
    });
  };

  render() {
    const {user} = this.props;
    if (!user) {
      return <Redirect to="/login"/>;
    }

    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input onChange={this.handleFormUpdate} id="title" name="title" placeholder="Seeking Dog Nail Art Expert"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} id="description" name="description" type="textarea" placeholder="I am looking for someone to paint the nails of my beloved German Shephard named Tootsie weekly."/>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Create Work Request</Button>
      </Form>
    );
  }
}