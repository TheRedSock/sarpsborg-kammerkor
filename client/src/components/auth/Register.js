import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Form, Input } from 'reactstrap';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirm: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth.user.admin) {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/intern/hjem');
      } else {
        this.props.history.push('/logg-inn');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      confirm: this.state.confirm
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <Row>
            <Col md="8" className="m-auto">
              <h1 className="display-4 text-center">Registrer bruker</h1>
              <p className="lead text-center">
                Lag en bruker for Sarpsborg Kammerkor's interne sider.
              </p>
              <Form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Brukernavn"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Passord"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Bekreft Passord"
                  name="password"
                  value={this.state.confirm}
                  onChange={this.onChange}
                  error={errors.confirm}
                />
                <Input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Registrer"
                />
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
