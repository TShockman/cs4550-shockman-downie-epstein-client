import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Redirect} from 'react-router-dom';

export default class NewListing extends Component {
  static propTypes = {
    user: PropTypes.object,
    createListing: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      rate: '',
      imageSrcs: ''
    };
  }

  handleFormUpdate = event => {
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {createListing} = this.props;
    const {title, description, imageSrcs, rate} = this.state;

    createListing({
      title,
      description,
      imageSrcs,
      rate
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
          <Input onChange={this.handleFormUpdate} id="title" name="title" placeholder="Custom Embroidery"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} id="description" name="description" type="textarea" placeholder="I make custom embroidered shoelaces!"/>
        </FormGroup>
        <FormGroup>
          <Label for="rate">Rate</Label>
          <Input onChange={this.handleFormUpdate} id="rate" name="rate" placeholder="$30/pair"/>
        </FormGroup>
        <FormGroup>
          <Label for="imageSrcs">Image Sources</Label>
          <Input onChange={this.handleFormUpdate} id="imageSrcs" name="imageSrcs" type="textarea"/>
          <FormText>One image source URL per line.</FormText>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Create Listing</Button>
      </Form>
    );
  }
}