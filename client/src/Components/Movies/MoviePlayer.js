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
import { Link } from "react-router-dom";
import "video-react/dist/video-react.css";

class MoviePlayer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const url = `${process.env.REACT_APP_APIURL}/api/movies/${this.props.match.params.id}`;
    //Get Movie data
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        } else {
          return response.json();
        }
      })
      .then((json) => {
        this.setState({
          movie: json.data,
          url: `https://homeflix-media.azureedge.net/movies/${json.data.fileName}`,
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    return (
      <div>
        <Button
          outline
          className="backButton"
          color="primary"
          size="lg"
          tag={Link}
          to="/movies/"
        >
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
