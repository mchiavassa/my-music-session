import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';
import LoadingBar from 'react-redux-loading-bar';

class App extends React.Component {
  render() {
    return (
      <div>
        <LoadingBar className="loading" />
        <Header />
        <div className="container-fluid">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default connect()(App);
