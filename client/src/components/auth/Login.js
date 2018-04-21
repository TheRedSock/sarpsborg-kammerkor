import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
      password: this.state.password
    };

    axios
      .post('/api/users/login', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <Row>
            <Col md="8" className="m-auto">
              <h1 className="display-4 text-center">Logg Inn</h1>
              <p className="lead text-center">
                Logg inn til Sarpsborg Kammerkor's interne sider.
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
                <Input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Logg Inn"
                />
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
