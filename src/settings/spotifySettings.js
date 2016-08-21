const spotifySettings = {
  clientId: 'a4bcf6400dba4bcb9795c254dd0608a3',
  scopes: ['user-follow-modify user-follow-read user-library-read user-top-read playlist-modify-private'],
  redirect_uri: 'http://localhost:3000/callback' //TODO: improve depending on the env config.
};

export default spotifySettings;
