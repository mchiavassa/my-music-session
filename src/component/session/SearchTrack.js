import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {searchTrack, getRecommendations, addTrackToPlaylist} from '../../actions/sessionActions';
import Autosuggest from 'react-autosuggest';

class SearchTrack extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(event, {newValue}) {
    this.setState({query: newValue});
  }

  onSuggestionSelected(event, {suggestion}) {
    this.setState({query: ''});

    this.props.dispatch(getRecommendations(suggestion.fullTrack, 13, true));
    this.props.dispatch(addTrackToPlaylist(suggestion.fullTrack));
  }

  onSuggestionsUpdateRequested ({value}) {
    this.props.dispatch(searchTrack(value));
  }

  renderSuggestion(suggestion) {
    return (<span id={suggestion.id}>
              <div><strong>{suggestion.name}</strong></div>
              <div>{suggestion.artist.name} ({suggestion.album})</div>
            </span>);
  }

  getSuggestionValue(suggestion) {
    return `${suggestion.name} - ${suggestion.artist.name}`;
  }

  shouldRenderSuggestions(value) {
    return value.trim().length > 1;
  }

  render() {

    const {query} = this.state;
    const inputProps = {
      placeholder: 'Look for one of your favourite songs...',
      value: query,
      onChange: this.onChange,
      className: 'search'
    };

    return (
      <div className="row">
        <Autosuggest suggestions={this.props.tracks}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={this.getSuggestionValue}
                     shouldRenderSuggestions={this.shouldRenderSuggestions}
                     onSuggestionSelected={this.onSuggestionSelected}
                     renderSuggestion={this.renderSuggestion}
                     inputProps={inputProps} />
      </div>
    );
  }
}

SearchTrack.propTypes = {
  tracks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string
};

function mapStateToProps(state) {
  let tracks = [];

  if (state.session.autosuggestTracks.length > 0) {
    tracks = state.session.autosuggestTracks.map(track => {
      return {
        id: track.id,
        name: track.name,
        artist: {id: track.artists[0].id, name: track.artists[0].name},
        album: track.album.name,
        popularity: track.popularity,
        fullTrack: track
      };
    });
  }

  return {
    tracks: tracks
  };
}

export default connect(mapStateToProps)(SearchTrack);
