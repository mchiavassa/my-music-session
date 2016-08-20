import SpotifyWebApi from 'spotify-web-api-js';

let singleton = Symbol();

class SpotifyApi extends SpotifyWebApi {

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new SpotifyApi();
    }
    return this[singleton];
  }

  getAuthorizationUrl(clientId, scopes, redirectUri) {
    let url_login = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=' +
      clientId + '&redirect_uri=' + encodeURIComponent(redirectUri) +
      ( scopes ? '&scope=' + encodeURIComponent(scopes) : '');
    return new Promise((resolve) => {
      resolve(url_login);
    });
  }
}

export default SpotifyApi;

