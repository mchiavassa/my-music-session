import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {getUser} from '../../actions/loginActions';
import appSettings from '../../settings/appSettings';

class LoginCallback extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const token = window.location.hash.split('&')[0].split('=')[1];
    if (token) {
      this.props.dispatch(getUser(token));
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.login.user != this.props.login.user) {
      const {user, token} = nextProps.login;

      localStorage.setItem(appSettings.tokenStorageKey, token);
      localStorage.setItem(appSettings.userStorageKey, JSON.stringify(user));

      browserHistory.push('/');
    }
  }

  render() {
    return (<div>Loading...</div>);
  }
}

LoginCallback.propTypes = {
  login: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(mapStateToProps)(LoginCallback);
