import React from "react";
import ReactLoading from "react-loading";
import FlexView from "react-flexview";

class LoadingSpinner extends React.Component {
  render() {
    return (
      <FlexView
        hAlignContent="center"
        vAlignContent="center"
        className="fullScreen"
      >
        <ReactLoading type={"spin"} color={"#fff"} height={100} />
      </FlexView>
    );
  }
}

export default LoadingSpinner;
