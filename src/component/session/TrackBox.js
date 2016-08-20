import React, {PropTypes} from 'react';
import Player from './Player';

const TrackBox = ({track, addToPlaylist, stopAllAudios, registerAudio}) => {
  return (
    <li>
      {track.album.images.length > 2 ?
        <img src={track.album.images[1].url} alt={track.album.name} /> :
        <img src="img/track-default.png" alt={track.album.name} width="150" height="150"/>
      }
      <div className="caption">
        <div className="blur"></div>
        <div className="caption-text">
          <div className="row">
            <div className="col-md-6 btn-action">
              <Player
                source={track.preview_url}
                registerAudio={registerAudio}
                stopAll={stopAllAudios}
              />
            </div>
            <div className="col-md-6 btn-action" onClick={() => addToPlaylist(track)}>Add</div>
          </div>
          <h1>{track.name}</h1>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
    </li>
  );
};

TrackBox.propTypes = {
  track: PropTypes.object,
  addToPlaylist: PropTypes.func.isRequired,
  stopAllAudios: PropTypes.func.isRequired,
  registerAudio: PropTypes.func.isRequired
};

export default TrackBox;
