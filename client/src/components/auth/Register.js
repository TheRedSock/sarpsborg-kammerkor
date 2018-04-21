import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';

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

    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));

    //this.props.registerUser(newUser, this.props.history);
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
                <FormGroup>
                  <Input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.username
                    })}
                    placeholder="Brukernavn"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Passord"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.confirm
                    })}
                    placeholder="Bekreft Passord"
                    name="confirm"
                    value={this.state.confirm}
                    onChange={this.onChange}
                  />
                  {errors.confirm && (
                    <div className="invalid-feedback">{errors.confirm}</div>
                  )}
                </FormGroup>
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

export default Register;
