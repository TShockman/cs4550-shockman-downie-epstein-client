import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
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
      description: '',
      compensation: '',
      imageSrcs: ''
    };
  }

  handleFormUpdate = event => {
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {createWorkRequest} = this.props;
    const {title, description, compensation, imageSrcs} = this.state;

    createWorkRequest({
      title,
      description,
      compensation,
      imageSrcs
    });
  };

  render() {
    const {user} = this.props;
    if (!user) {
      return <Redirect to="/login"/>;
    }

    return (
      <Form className="form-control">
        <FormGroup>
          <Label for="title">Title</Label>
          <Input onChange={this.handleFormUpdate} id="title" name="title" placeholder="Seeking Dog Nail Art Expert"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} id="description" name="description" type="textarea" placeholder="I am looking for someone to paint the nails of my beloved German Shephard named Tootsie weekly."/>
        </FormGroup>
        <FormGroup>
          <Label for="compensation">Compensation</Label>
          <Input onChange={this.handleFormUpdate} id="compensation" name="compensation" placeholder="$100/hour"/>
        </FormGroup>
        <FormGroup>
          <Label for="imageSrcs">Image Sources</Label>
          <Input onChange={this.handleFormUpdate} id="imageSrcs" name="imageSrcs" type="textarea"/>
          <FormText>One image source URL per line.</FormText>
        </FormGroup>
        <Button className="btn btn-primary" onClick={this.handleSubmit}>Create Work Request</Button>
      </Form>
    );
  }
}