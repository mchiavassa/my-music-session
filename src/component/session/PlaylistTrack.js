import React, {PropTypes} from 'react';
import Player from './Player';

const PlaylistTrack = ({track, actions}) => {
  return (
    <li>
      <div className="track-content">
        <div className="album-thumb">
          <img src={track.album.images[2].url} alt={track.album.name} height="64" width="64"/>
          <Player
            className="player-playlist"
            source={track.preview_url}
            registerAudio={actions.registerAudio}
            stopAll={actions.stopAllAudios}
          />
        </div>
        <h1>{track.name}</h1>
        <h2>{track.artists[0].name}</h2>
        <p className="remove-track" onClick={() => actions.removeFromPlaylist(track.id)}>
          <span className="fa fa-remove"></span>
        </p>
      </div>
    </li>
  );
};

PlaylistTrack.propTypes = {
  track: PropTypes.object,
  actions: PropTypes.object
};

export default PlaylistTrack;
