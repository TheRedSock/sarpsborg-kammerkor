import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';

import Spinner from '../common/Spinner';
import { getUpcomingPractices } from '../../actions/practiceActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false
    };
  }

  componentDidMount() {
    this.props.getUpcomingPractices();

    if (this.props.auth.user.admin) {
      if (this.props.auth.isAuthenticated) {
        this.setState({ isAdmin: true });
      }
    }
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
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        };
        dashboardContent = upcoming.map(practice => (
          <Table className="border">
            <tbody>
              <tr>
                <th scope="row">Fra:</th>
                <td>
                  {new Date(practice.from).toLocaleDateString('nb', options)}
                </td>
              </tr>
              <tr>
                <th scope="row">Til:</th>
                <td>
                  {new Date(practice.to).toLocaleDateString('nb', options)}
                </td>
              </tr>
              <tr>
                <th scope="row">Type:</th>
                <td>{practice.tag}</td>
              </tr>
              <tr>
                <th scope="row">Info:</th>
                <td>{practice.information}</td>
              </tr>
            </tbody>
          </Table>
        ));
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
