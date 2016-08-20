import React, {PropTypes} from 'react';
import TrackBox from './TrackBox';

const TrackList = ({tracks, actions}) => {
  return (
    <ul className="track-list">
      {tracks.map(track =>
        <TrackBox
          key={track.id}
          track={track}
          addToPlaylist={actions.addToPlaylist}
          registerAudio={actions.registerAudio}
          stopAllAudios={actions.stopAllAudios}/>
      )}
    </ul>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array,
  actions: PropTypes.object.isRequired
};

export default TrackList;
