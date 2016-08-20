import * as types from './actionTypes';
import spotifySettings from '../settings/spotifySettings';
import SpotifyApi from '../api/SpotifyApi';

export function requestAuthenticationUrl() {
  return function (dispatch) {

    return SpotifyApi.instance.getAuthorizationUrl(spotifySettings.clientId, spotifySettings.scopes, spotifySettings.redirect_uri)
      .then(url => {
        dispatch(receiveAuthenticationUrl(url));
      }).catch(error => {
        throw(error);
      });
  };
}

export function receiveAuthenticationUrl(url) {
  return {type: types.LOGIN_RECEIVE_AUTHENTICATION_URL, url};
}

export function getUser(token) {
  return function (dispatch) {

    let spotifyApi = SpotifyApi.instance;
    spotifyApi.setAccessToken(token);

    return new spotifyApi.getMe().then(user => {
      dispatch(receiveUser(user, token));
    }).catch(error => {
      throw(error);
    });
  };
}

export function receiveUser(user, token) {
  return {type: types.LOGIN_RECEIVE_USER, user, token};
}

export function tryGetUserWithToken(token) {
  return function (dispatch) {

    let spotifyApi = SpotifyApi.instance;
    spotifyApi.setAccessToken(token);

    return new spotifyApi.getMe().then(user => {
      dispatch(receiveUser(user, token));
    }).catch(() => {
      dispatch(requestAuthenticationUrl());
    });
  };
}


