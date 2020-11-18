import React from "react";
import { Table } from "reactstrap";
import Loading from "../LoadingSpinner";
import EpisodeRow from "./EpisodeRow";

class TVShowEpisodes extends React.Component {
  componentWillMount() {
    this.setState({
      episodes: this.props.data
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.episodes) {
      var episodes = this.state.episodes.map(episode => {
        return <EpisodeRow key={episode.id} data={episode} />;
      });
    }
    return (
      <Table dark size="sm" responsive className="my-3">
        <thead>
          <tr className="font-weight-bold text-uppercase">
            <th className="w-10">Season</th>
            <th className="w-10">Episode</th>
            <th className="w-30">Title</th>
            <th className="w-40">Description</th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>{episodes}</tbody>
      </Table>
    );
  }
}

export default TVShowEpisodes;
