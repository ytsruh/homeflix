import React from "react";
//Components
import Dashboard from "./Dashboard";
import Navigation from "./Navbar";
import Loading from "./LoadingSpinner";
//Movie Components
import Movies from "./Movies/Movies";
import MoviePlayer from "./Movies/MoviePlayer";
//TV Show Components
import Shows from "./Shows/Shows";
import SingleShow from "./Shows/SingleShow";
import ShowPlayer from "./Shows/ShowPlayer";
import { Route, Switch, Redirect } from "react-router-dom";

class ProtectedRoutes extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movies/:id" component={MoviePlayer} />
            <Route exact path="/shows" component={Shows} />
            <Route exact path="/shows/:id/episode/:episode" component={ShowPlayer} />
            <Route exact path="/shows/:id" component={SingleShow} />
          </Switch>
        </div>
      );
    } else if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

export default ProtectedRoutes;
