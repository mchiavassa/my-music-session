export default {
  session: {
    autosuggestTracks: [],
    recommendedTracks: [],
    audioFeatures: {
      danceability: null,
      energy: null,
      loudness: null,
      speechiness: null,
      acousticness: null,
      instrumentalness: null,
      liveness: null,
      valence: null,
      tempo: null,
      popularity: null
    },
    playlist: []
  },
  login : {
    authUrl: '',
    isAuthenticated: false,
    token: '',
    user: {}
  }
};
