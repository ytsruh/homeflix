import React from "react";
import { Redirect } from "react-router-dom";
class Logout extends React.Component {
  render() {
    sessionStorage.clear();
    return <Redirect to="/login" />;
  }
}

export default Logout;
