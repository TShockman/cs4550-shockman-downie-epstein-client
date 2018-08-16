import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import Loading from '../common/Loading';
import {Link} from 'react-router-dom';

export default class UpdateProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      newPassword: '',
      name: '',
      dob: '',
    };
  }

  componentDidMount = () => {
    this.props.getProfile();
    if (this.props.user) {
      this.setState({
        name: this.props.user.name || '',
        dob: this.props.user.dateOfBirth || ''
      });
    }
  };

  componentDidUpdate = oldProps => {
    if ((!oldProps.user && this.props.user) || (oldProps.user && this.props.user && (oldProps.user.id !== this.props.user.id))) {
      this.setState({
        name: this.props.user.name || '',
        dob: this.props.user.dateOfBirth || ''
      });
    }
  };

  handleFormUpdate = event => {
    const {target} = event;
    this.setState({[target.id]: target.value});
  };

  handleSubmit = () => {
    const {user, updateProfile} = this.props;
    const {newPassword, name, dob} = this.state;

    const newUser = {
      id: user.id,
      username: user.username,
      name,
      dateOfBirth: dob
    };

    if (newPassword) {
      if (newPassword.length < 4) {
        return alert('Password length must be greater than 4');
      } else {
        newUser.password = newPassword;
      }
    }

    updateProfile(newUser);
  };

  render() {
    const {user} = this.props;
    if (!user) {
      return <Loading/>;
    }

    return (
      <Form>
        <FormGroup>
          <Label for="newPassword">New Password</Label>
          <Input onChange={this.handleFormUpdate} id="newPassword" name="newPassword" type="password" placeholder="***********" value={this.state.newPassword}/>
          <FormText>Leave this empty if you do not want to change your password.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input onChange={this.handleFormUpdate} id="name" name="name" type="text" placeholder="Jane Doe" value={this.state.name}/>
        </FormGroup>
        <FormGroup>
          <Label for="dob">Date of Birth</Label>
          <Input onChange={this.handleFormUpdate} id="dob" name="dob" type="date" value={this.state.dob}/>
        </FormGroup>
        <Link to="/profile" className="btn btn-secondary">Cancel</Link>
        <Button onClick={this.handleSubmit} className="btn btn-success">Update</Button>
      </Form>
    );
  }
}