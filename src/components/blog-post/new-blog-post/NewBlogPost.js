import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom';

export default class NewBlogPost extends Component {
  static propTypes = {
    user: PropTypes.object,
    createBlogPost: PropTypes.func.isRequired
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
    const {createBlogPost} = this.props;
    const {title, description} = this.state;

    createBlogPost({
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
          <Input onChange={this.handleFormUpdate} id="title" name="title" placeholder="Announcement!"/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input onChange={this.handleFormUpdate} id="description" name="description" type="textarea" placeholder="Today we are launching a new feature!"/>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Create Blog Post</Button>
      </Form>
    );
  }
}