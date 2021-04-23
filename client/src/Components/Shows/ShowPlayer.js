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

class ShowPlayer extends React.Component {
  constructor(props) {
    super();
    this.state = { episode: props.location.state.episode, show: props.location.state.show };
  }

  render() {
    if (!this.state.episode || !this.state.show) {
      return <Redirect to="shows" />;
    }
    const url = `https://homeflix-media.azureedge.net/shows/${this.state.show.PartitionKey}/Season ${this.state.episode.season}/${this.state.episode.fileName}`;
    return (
      <div>
        <div className="my-3">
          <Button
            outline
            className="backButton"
            color="primary"
            size="lg"
            tag={Link}
            to={"/shows/" + this.props.match.params.id}
          >
            {"< "}Back
          </Button>
        </div>

        <Player src={url} aspectRatio="16:9" fluid={true}>
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

export default ShowPlayer;
