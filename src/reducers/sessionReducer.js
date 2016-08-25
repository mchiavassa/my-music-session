import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.SEARCH_RECEIVE_SEARCH_SUGGESTIONS:
      return Object.assign({}, state, {autosuggestTracks: action.tracks});

    case types.SESSION_RECEIVE_RECOMMENDATIONS:
    {
      if (action.clearList) {
        return Object.assign({}, state, {
          loading: false,
          autosuggestTracks: [],
          recommendedTracks: action.recommendedTracks
        });
      }
      else {
        let newRecommendedTracks = [];

        action.recommendedTracks.map(track => {
          if (state.recommendedTracks.filter(t => t.id == track.id).length == 0) {
            newRecommendedTracks.push(track);
          }
        });

        return Object.assign({}, state, {
          loading: false,
          recommendedTracks: [...newRecommendedTracks].concat(state.recommendedTracks)
        });
      }
    }

    case types.SESSION_RECEIVE_AUDIO_FEATURES:
      return Object.assign({}, state, {
        audioFeatures: {
          danceability: action.audioFeatures.danceability,
          energy: action.audioFeatures.energy,
          loudness: action.audioFeatures.loudness,
          speechiness: action.audioFeatures.speechiness,
          acousticness: action.audioFeatures.acousticness,
          instrumentalness: action.audioFeatures.instrumentalness,
          liveness: action.audioFeatures.liveness,
          valence: action.audioFeatures.valence,
          tempo: action.audioFeatures.tempo,
          popularity: action.audioFeatures.popularity
        }
      });

    case types.PLAYLIST_ADD_TRACK:
    {
      if(state.playlist.filter(track => track.id == action.track.id).length > 0) {
        return Object.assign({}, state, {
          recommendedTracks: [...state.recommendedTracks.filter(track => track.id != action.track.id)]
        });
      }

      let addedTrack = Object.assign({}, state.recommendedTracks.filter(track => track.id == action.track.id)[0]);
      addedTrack.added = true;

      return Object.assign({}, state, {
        playlist: [...state.playlist, action.track],
        recommendedTracks: [...state.recommendedTracks.filter(track => track.id != action.track.id), addedTrack]
      });
    }

    case types.PLAYLIST_REMOVE_TRACK:
    {
      let removedTrack = Object.assign({}, state.recommendedTracks.filter(track => track.id == action.trackId)[0]);
      removedTrack.added = false;
      removedTrack.removed = true;

      return Object.assign({}, state, {
        playlist: [...state.playlist.filter(track => track.id !== action.trackId)],
        recommendedTracks: [...state.recommendedTracks.filter(track => track.id != action.trackId), removedTrack]
      });
    }

    case types.PLAYLIST_EXPORT:
      return Object.assign({}, state, {
        playlist: [],
        recommendedTracks: []
      });

    default:
      return state;
  }
}
