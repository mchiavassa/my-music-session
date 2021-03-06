import * as types from './actionTypes';
import SpotifyApi from '../api/SpotifyApi';
import appSettings from '../settings/appSettings';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import toastr from 'toastr';

export function receiveSearchSuggestions(tracks) {
  return {type: types.SEARCH_RECEIVE_SEARCH_SUGGESTIONS, tracks};
}

export function receiveAudioFeatures(audioFeatures) {
  return {type: types.SESSION_RECEIVE_AUDIO_FEATURES, audioFeatures};
}

export function receiveRecommendations(recommendedTracks, clearList) {
  return {type: types.SESSION_RECEIVE_RECOMMENDATIONS, recommendedTracks, clearList};
}

export function addTrackToPlaylist(track) {
  return {type: types.PLAYLIST_ADD_TRACK, track};
}

export function removeTrackFromPlaylist(trackId) {
  return {type: types.PLAYLIST_REMOVE_TRACK, trackId};
}

export function exportedPlaylist() {
  return {type: types.PLAYLIST_EXPORT};
}


export function searchTrack(query) {
  return function (dispatch) {

    return SpotifyApi.instance.searchTracks(query, {limit: 5})
      .then(data  => {
        dispatch(receiveSearchSuggestions(data.tracks.items));
      }).catch(error => {
        toastr.error('There was an error trying to search for tracks. Try again later.');
        throw(error);
      });
  };
}

export function getRecommendations(track, limit, clearList) {
  return function (dispatch, getState) {
    dispatch(showLoading());

    const spotifyApi = SpotifyApi.instance;

    let options = {
      limit: limit,
      seed_tracks: track.id,
      seed_artist: track.artists[0].id
    };

    spotifyApi.getAudioFeaturesForTrack(track.id)
      .then(audioFeatures => {
        audioFeatures.popularity = track.popularity;

        const calculatedAudioFeatures = calculateNewAudioFeatures(audioFeatures, getState().session.audioFeatures);
        dispatch(receiveAudioFeatures(calculatedAudioFeatures));
      })
      .then(() => {
        fillOptionsToTarget(options, getState().session.audioFeatures);

        spotifyApi.getRecommendations(options).then(response  => {
          dispatch(receiveRecommendations(response.tracks.filter(t => t.id != track.id), clearList));
          dispatch(hideLoading());
        }).catch(error => {
          dispatch(hideLoading());
          toastr.error('There was an error trying get recommended tracks. Try again later.');
          throw(error);
        });
      });
  };
}


function calculateNewAudioFeatures(newAudioFeatures, currentAudioFeatures) {
  let audioFeatures = {};

  for(let feature in currentAudioFeatures){

    if (currentAudioFeatures[feature] != null) {
      audioFeatures[feature] = parseFloat((newAudioFeatures[feature] + currentAudioFeatures[feature] / 2).toFixed(4));
    } else {
      audioFeatures[feature] = newAudioFeatures[feature];
    }
  }

  // round popularity to be an integer
  audioFeatures['popularity'] = Math.round(audioFeatures['popularity']);

  return audioFeatures;
}

function fillOptionsToTarget(options, audioFeatures){
  for(let feature in audioFeatures){
      options['target_' + feature] = audioFeatures[feature];
  }
}

export function exportPlaylist() {
  return function(dispatch, getState) {
    const spotifyApi = SpotifyApi.instance;

    const userId = getState().login.user.id;

    spotifyApi.createPlaylist(userId, {public: false, name: appSettings.playlistName})
      .then(playlist => {
        const playlistTracks = getState().session.playlist;
        spotifyApi.addTracksToPlaylist(userId, playlist.id, getTrackUris(playlistTracks))
          .then(response => {
            dispatch(exportedPlaylist());
            toastr.success('Playlist exported! Go check on your Spotify!');
          });
      })
      .catch(error => {
        toastr.error('There was an error trying to export the playlist. Try again later.');
        throw(error);
      });
  };
}

function getTrackUris(tracks) {
  return tracks.map(track => {return track.uri; }).join(",");
}


