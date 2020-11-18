import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class EpisodeRow extends React.Component {
  componentWillMount() {
    this.setState({
      episode: this.props.data,
      filter: this.props.filter
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.filter !== prevProps.filter) {
      this.setState({
        filter: this.props.filter
      });
    }
  }

  render() {
    let display;
    if (parseInt(this.state.filter, 16) > 0) {
      if (
        parseInt(this.state.episode.season, 16) !==
        parseInt(this.state.filter, 16)
      ) {
        display = "d-none";
      }
    } else {
      display = "";
    }
    return (
      <tr className={"font-weight-bold " + display}>
        <td>{this.state.episode.season}</td>
        <td>{this.state.episode.number}</td>
        <td>{this.state.episode.title}</td>
        <td>{this.state.episode.description}</td>
        <td>
          <Button
            color="primary"
            size="lg"
            tag={Link}
            to={
              "/shows/" +
              this.state.episode.ShowId +
              "/episode/" +
              this.state.episode.id
            }
          >
            Play
          </Button>
        </td>
      </tr>
    );
  }
}

export default EpisodeRow;
