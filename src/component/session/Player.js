import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      src: this.props.source,
      elem: null,
      isPlaying: false,
      isLoading: false
    };
    this.playerEvent = {};
  }

  componentDidMount() {
    this.audioTag = ReactDOM.findDOMNode(this.refs.audio);
    this.props.registerAudio(this.audioTag);

    this.playerEvent.loadStart = () => {
      this.setState({
        isLoading: true
      });
    };

    this.playerEvent.loadEnd = () => {
      this.setState({
        isLoading: false
      });
    };

    this.playerEvent.isPlaying = () => {
      this.setState({
        isPlaying: false
      });
    };

    this.audioTag.addEventListener('ended', this.playerEvent.isPlaying);
    this.audioTag.addEventListener('pause', this.playerEvent.isPlaying);
    this.audioTag.addEventListener('loadeddata', this.playerEvent.loadEnd);
    this.audioTag.addEventListener('loadstart', this.playerEvent.loadStart);
    this.audioTag.addEventListener('suspend', this.playerEvent.loadEnd);
  }

  componentWillUnmount() {
    this.audioTag.removeEventListener('ended', this.playerEvent.isPlaying);
    this.audioTag.removeEventListener('pause', this.playerEvent.isPlaying);
    this.audioTag.removeEventListener('loadeddata', this.playerEvent.loadEnd);
    this.audioTag.removeEventListener('loadstart', this.playerEvent.loadStart);
    this.audioTag.removeEventListener('suspend', this.playerEvent.loadStart);
  }

  play() {
    this.props.stopAll.apply();
    this.audioTag.play();
    this.setState({isPlaying: true});
  }

  stop() {
    this.audioTag.pause();
    this.setState({isPlaying: false});
  }

  render() {

    return (
      <div>
        { !this.state.isPlaying && !this.state.isLoading ?
          <div className={"player " + this.props.className || ""} onClick={this.play.bind(this)}>
            <span className="fa fa-2x fa-play"></span>
          </div> : null
        }
        {this.state.isPlaying && !this.state.isLoading ?
          <div className={"player " + this.props.className || ""} onClick={this.stop.bind(this)}>
            <span className="fa fa-2x fa-pause"></span>
          </div> : null
        }
        {this.state.isLoading ?
          <div className={"player " + this.props.className || ""}>
            <span className="fa fa-2x fa-clock"></span>
          </div> : null
        }
        <audio ref="audio" src={this.props.source} preload="none"/>
      </div>
    );
  }
}

Player.propTypes = {
  source : PropTypes.string.isRequired,
  registerAudio: PropTypes.func.isRequired,
  stopAll: PropTypes.func.isRequired
};

export default Player;
