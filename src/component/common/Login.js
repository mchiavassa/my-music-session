import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {requestAuthenticationUrl, tryGetUserWithToken} from '../../actions/loginActions';
import appSettings from '../../settings/appSettings';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem(appSettings.tokenStorageKey);
    if (token) {
      this.props.dispatch(tryGetUserWithToken(token));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.authUrl !== this.props.login.authUrl) {
      const {authUrl} = nextProps.login;
      window.location = authUrl;
    }
  }

  onClick() {
    const { dispatch } = this.props;
    dispatch(requestAuthenticationUrl());
  }

  render() {
    const loginRender = this.props.login.isAuthenticated ?
      <div>Hi <span className="user-login">{this.props.login.user.display_name}</span> !</div> :
      <button type="button" className="btn btn-spotify" onClick={this.onClick}>
        Connect with Spotify
      </button>;

    return (<div>{loginRender}</div>);
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(mapStateToProps)(Login);
