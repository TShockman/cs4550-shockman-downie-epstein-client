import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      role: 'DESIGNER'
    };
  }

  handleFormUpdate = event => {
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = event => {
    event.stopPropagation();
    const {registerUser} = this.props;
    const {username, password, passwordConfirm, role} = this.state;

    if (!username || password.length < 4 || (password !== passwordConfirm)) {
      alert('Please make sure all registration information is valid before continuing.');
      return;
    }

    registerUser({
      username,
      password,
      role
    });
  };

  render() {
    return (
      <Form onSubmit={() => console.log('Submitted!')}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input onChange={this.handleFormUpdate} id="username" name="username" placeholder="Jane_Doe"/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input onChange={this.handleFormUpdate} id="password" name="password" type="password" placeholder="***********"/>
        </FormGroup>
        <FormGroup>
          <Label for="passwordConfirm">Confirm Password</Label>
          <Input onChange={this.handleFormUpdate} id="passwordConfirm" name="passwordConfirm" type="password" placeholder="***********"/>
        </FormGroup>
        <FormGroup>
          <Label for="role">Account Type</Label>
          <Input onChange={this.handleFormUpdate} id="role" name="role" type="select">
            <option value="DESIGNER">Designer</option>
            <option value="CLIENT">Client</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="ADMIN">Administrator</option>
          </Input>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Register</Button>
      </Form>
    );
  }
}