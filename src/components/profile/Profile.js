import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.props.getProfile();
  };

  render() {
    const {user, logout, deleteAccount} = this.props;

    if (!user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Welcome {user.username}!</h2>
        <Button onClick={logout}>Logout</Button>
        <Button color="danger" onClick={deleteAccount}>Delete Account</Button>
      </div>
    );
  }
}