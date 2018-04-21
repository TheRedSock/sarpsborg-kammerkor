import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/intern/hjem');
    }
  }

  render() {
    return (
      <div>
        <Jumbotron fluid>
          <div className="container">
            <h1 className="display-4">Velkommen til Sarpsborg Kammerkor</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              a?
            </p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
