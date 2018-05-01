import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import Spinner from '../common/Spinner';
import { getUpcomingPractices } from '../../actions/practiceActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUpcomingPractices();
  }

  render() {
    //const { user } = this.props.auth;
    const { upcoming, loading } = this.props.practice;
    const { errors } = this.props;

    let dashboardContent;

    if (upcoming === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (errors.nopractice) {
        dashboardContent = <p>{errors.nopractice}</p>;
      } else {
        dashboardContent = <h4>TODO: DISPLAY UPCOMING</h4>;
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <Row>
            <Col md="12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getUpcomingPractices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  practice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  practice: state.practice,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getUpcomingPractices })(Dashboard);
