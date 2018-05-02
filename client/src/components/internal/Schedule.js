import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Alert } from 'reactstrap';

import TextFieldGroup from '../common/TextFieldGroup';
import DateTimePicker from '../common/DateTimePicker';
import SelectListGroup from '../common/SelectListGroup';

import { createPractice } from '../../actions/practiceActions';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      from: '',
      to: '',
      information: '',
      alertBox: <div />,
      visible: false,
      isAdmin: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      if (nextProps.errors !== this.state.errors) {
        this.setState({
          errors: nextProps.errors,
          visible: false
        });
      }
    }
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeFrom(e) {
    this.setState({
      from: e._d
    });
  }

  changeTo(e) {
    this.setState({
      to: e._d
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newPractice = {
      tag: this.state.tag,
      from: this.state.from,
      to: this.state.to,
      information: this.state.information
    };

    this.setState({
      visible: true
    });

    this.props.createPractice(newPractice, this.props.history);
    setTimeout(this.onDismiss, 4000);
  }

  componentDidMount() {
    if (this.props.auth.user.admin) {
      if (this.props.auth.isAuthenticated) {
        this.setState({ isAdmin: true });
      }
    }

    let defaultFrom = new Date(),
      defaultTo = new Date();

    defaultFrom.setHours(19, 0, 0, 0);
    defaultTo.setHours(21, 30, 0, 0);

    this.setState({
      from: defaultFrom,
      to: defaultTo
    });
  }

  render() {
    const { errors } = this.state;

    // Select options for practice types
    const options = [
      { label: '* Velg øvelse type', value: '' },
      { label: 'Øvelse', value: 'Øvelse' },
      { label: 'Konsert', value: 'Konsert' },
      { label: 'Seminar', value: 'Seminar' },
      { label: 'Fest', value: 'Fest' }
    ];

    const createNewPractice = (
      <Col md="8" className="m-auto">
        <h1 className="display-4 text-center">Legg til øvelse</h1>
        <p className="lead text-center">
          Legg til en ny øvelse i semesterplanen.
        </p>
        <Form onSubmit={this.onSubmit}>
          <SelectListGroup
            name="tag"
            value={this.state.tag}
            options={options}
            onChange={this.onChange}
            error={errors.tag}
            info="Velg hva slags type øvelse/oppmøte det er"
          />
          <DateTimePicker
            value={this.state.from}
            info="Når øvelsen starter"
            onChange={this.changeFrom.bind(this)}
            error={errors.from}
          />
          <DateTimePicker
            value={this.state.to}
            info="Når øvelsen slutter"
            onChange={this.changeTo.bind(this)}
            error={errors.to}
          />
          <TextFieldGroup
            type="textarea"
            placeholder="Informasjon"
            name="information"
            value={this.state.information}
            onChange={this.onChange}
            error={errors.information}
          />
          <Input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="Legg til"
          />
        </Form>
      </Col>
    );

    return (
      <div className="container">
        <Alert
          color="info"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          className="mt-2"
        >
          Ny øvelse er lagt til!
        </Alert>
        <Row>{this.state.isAdmin && createNewPractice}</Row>
      </div>
    );
  }
}

Schedule.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createPractice })(
  withRouter(Schedule)
);
