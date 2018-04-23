import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { logoutUser } from '../../actions/authActions';

class Navigation extends Component {
  constructor() {
    super();

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/logg-inn';
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/admin/registrering">
            Registrer Bruker
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="#!" onClick={this.onLogoutClick.bind(this)}>
            Logg ut
          </NavLink>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/om">
            Om Oss
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/logg-inn">
            Interne Sider
          </NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar color="faded" dark className="navbar-expand-sm bg-dark">
          <NavbarBrand tag={Link} to="/">
            Sarpsborg Kammerkor
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.collapsed} navbar>
            {isAuthenticated ? userLinks : guestLinks}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navigation);
