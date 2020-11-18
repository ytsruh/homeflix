import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import Loading from "../LoadingSpinner";
import SeasonButton from "./SeasonButton";
import EpisodeRow from "./EpisodeRow";

class SingleShow extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      filteredSeason: 0,
    };
    this.getSeasonList = this.getSeasonList.bind(this);
    this.filterSeason = this.filterSeason.bind(this);
  }

  filterSeason(event) {
    event.preventDefault();
    this.setState({
      filteredSeason: event.target.value,
    });
  }

  getSeasonList(episodes) {
    const list = [];
    for (let i = 0; i < episodes.length; i++) {
      const element = episodes[i];
      if (list.indexOf(element.season) === -1) {
        list.push(element.season);
      }
    }
    return list;
  }

  componentWillMount() {
    fetch(
      `${process.env.REACT_APP_APIURL}/api/shows/${this.props.match.params.id}`
    )
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
          show: json.data,
          episodes: json.episodes,
          seasonList: this.getSeasonList(json.episodes),
          loading: false,
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      let imageUrl;
      if (this.state.show.imageName) {
        imageUrl = `https://homeflix-media.azureedge.net/images/shows/${this.state.show.imageName}`;
      } else {
        imageUrl = "http://via.placeholder.com/1350x900";
      }
      var episodes = this.state.episodes.map((episode) => {
        return (
          <EpisodeRow
            key={episode.id}
            data={episode}
            filter={this.state.filteredSeason}
          />
        );
      });
      return (
        <Container fluid>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <Row>
                <div className="my-3">
                  <h1 className="text-primary">{this.state.show.name}</h1>
                </div>
              </Row>
              <Row>
                <Col md="5">
                  <div className="my-3">
                    <img
                      src={imageUrl}
                      alt={this.state.show.name}
                      className="showImageThumbnail"
                    />
                  </div>
                </Col>
                <Col md="7" />
              </Row>
              <Row>
                <Col md="12" className="my-3">
                  <SeasonButton
                    seasons={this.state.seasonList}
                    function={this.filterSeason}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
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
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default SingleShow;
