import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class DesignsRUsNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="primary" light expand="lg">
          <Link className="navbar-brand" to="/">Designs R Us</Link>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/listing/search">Search Listings</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/workRequest/search">Search Work Requests</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/register">Register</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/profile">Profile</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/">Home</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}