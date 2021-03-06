import React from "react";
import { Col } from "reactstrap";

class ShowList extends React.Component {
  componentWillMount() {
    this.setState({ show: this.props.data });
  }

  render() {
    let imageUrl;
    if (this.state.show.imageName) {
      imageUrl = `https://homeflix-media.azureedge.net/images/shows/${this.state.show.imageName}`;
    } else {
      imageUrl = "http://via.placeholder.com/1350x900";
    }
    return (
      <Col md="4" className="my-3 showImageContainer">
        <a href={"./shows/" + this.state.show.RowKey} className="showLink">
          <p className="text-white text-center showTitle">{this.state.show.PartitionKey}</p>
          <img src={imageUrl} alt={this.state.show.PartitionKey} className="showImageThumbnail" />
        </a>
      </Col>
    );
  }
}

export default ShowList;
