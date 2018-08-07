import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import Loading from '../common/Loading';
import {Link} from 'react-router-dom';

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
      return <Loading/>;
    }

    return (
      <div>
        <h2>Welcome {user.username}!</h2>
        <Button onClick={logout}>Logout</Button>
        <Button color="danger" onClick={deleteAccount}>Delete Account</Button>
        {user.role === 'DESIGNER' && <Link to="/listing/new">Create Listing</Link>}
      </div>
    );
  }
}