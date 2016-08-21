import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addTrackToPlaylist, getRecommendations, removeTrackFromPlaylist, exportPlaylist} from '../../actions/sessionActions';
import SearchTrack from './SearchTrack';
import TrackList from './TrackList';
import Playlist from './Playlist';
import toastr from 'toastr';

class SessionDesk extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { audios: [] };
  }

  addToPlaylist(track) {
    this.props.dispatch(addTrackToPlaylist(track));
    this.props.dispatch(getRecommendations(track, 6, false));
  }

  removeFromPlaylist(trackId) {
    this.props.dispatch(removeTrackFromPlaylist(trackId));
    toastr.success("Track removed!");
  }

  exportPlaylist() {
    this.props.dispatch(exportPlaylist());
  }

  registerAudio(elem) {
    this.state.audios.push(elem);
  }

  stopAllAudios() {
    this.state.audios.map(audio => {
      audio.pause();
    });
  }

  render() {
    const actions = {
      addToPlaylist: this.addToPlaylist.bind(this),
      removeFromPlaylist: this.removeFromPlaylist.bind(this),
      registerAudio: this.registerAudio.bind(this),
      stopAllAudios: this.stopAllAudios.bind(this),
      exportPlaylist: this.exportPlaylist.bind(this)
    };

    return (<div>
              <SearchTrack />
              <div className="row">
                <div className="col-md-9">
                  <TrackList tracks={this.props.recommendedTracks} actions={actions}/>
                </div>
                <div className="col-md-3"><Playlist actions={actions} /></div>
              </div>
            </div>);
  }
}

SessionDesk.propTypes = {
  recommendedTracks : PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {

  return {
    recommendedTracks : state.session.recommendedTracks.filter(track => !track.added && !track.removed)
  };
}

export default connect(mapStateToProps)(SessionDesk);
