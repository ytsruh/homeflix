import React from "react";
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import "video-react/dist/video-react.css";

class MoviePlayer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      movie: props.location.state.movie,
      url: `https://homeflix-media.azureedge.net/movies/${props.location.state.movie.fileName}`,
    };
  }

  render() {
    if (!this.state.movie) {
      return <Redirect to="/movies" />;
    }
    return (
      <div>
        <Button outline className="backButton" color="primary" size="lg" tag={Link} to="/movies/">
          {"< "}Back
        </Button>
        <Player src={this.state.url} aspectRatio="16:9" fluid={true}>
          <LoadingSpinner />
          <BigPlayButton position="center" />
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <VolumeMenuButton />
          </ControlBar>
        </Player>
      </div>
    );
  }
}

export default MoviePlayer;
