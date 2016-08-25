import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrackBox from './TrackBox';

const TrackList = ({tracks, actions}) => {
  const trackBoxes = tracks.map(track =>
    <TrackBox
      key={track.id}
      track={track}
      addToPlaylist={actions.addToPlaylist}
      registerAudio={actions.registerAudio}
      stopAllAudios={actions.stopAllAudios}/>
  );

  return (
    <ul className="track-list">
      <ReactCSSTransitionGroup transitionName="box" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {trackBoxes}
      </ReactCSSTransitionGroup>
    </ul>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array,
  actions: PropTypes.object.isRequired
};

export default TrackList;
