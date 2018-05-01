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
import { clearCurrentUpcoming } from '../../actions/practiceActions';

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
    this.props.clearCurrentUpcoming();
    this.props.logoutUser();
    window.location.href = '/logg-inn';
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  returnNavLinks() {
    const { isAuthenticated, user } = this.props.auth;

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

    const userLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/intern/semesterplan">
            Semesterplan
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="#!" onClick={this.onLogoutClick.bind(this)}>
            Logg ut
          </NavLink>
        </NavItem>
      </Nav>
    );

    const adminLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/admin/dashbord">
            Administrative Sider
          </NavLink>
        </NavItem>
        {userLinks}
      </Nav>
    );

    if (user.admin) {
      return adminLinks;
    } else if (isAuthenticated) {
      return userLinks;
    } else {
      return guestLinks;
    }
  }

  render() {
    return (
      <div>
        <Navbar color="faded" dark className="navbar-expand-sm bg-dark">
          <NavbarBrand tag={Link} to="/">
            Sarpsborg Kammerkor
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.collapsed} navbar>
            {this.returnNavLinks()}
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

export default connect(mapStateToProps, { logoutUser, clearCurrentUpcoming })(
  Navigation
);
