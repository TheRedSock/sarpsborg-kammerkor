import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

class Landing extends Component {
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

export default Landing;
