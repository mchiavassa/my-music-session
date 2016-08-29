import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PlaylistTrack from './PlaylistTrack';

class Playlist extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {playlistTracks, actions} = this.props;

    return (
      <div>
        <div>
          {playlistTracks.length > 0 ?
            <div className="playlist-header">
              <button className="btn btn-spotify" onClick={actions.exportPlaylist}>
                <span className="fa fa-spotify"></span> Export it
              </button>
            </div>
          : null}

          <ul className="playlist">
            {playlistTracks.length > 0 ? playlistTracks.map(track =>
              <PlaylistTrack key={track.id} track={track} actions={actions} />
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlistTracks: PropTypes.array.isRequired,
  actions: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    playlistTracks: state.session.playlist
  };
}

export default connect(mapStateToProps)(Playlist);
