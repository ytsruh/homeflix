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
//Admin Components
import MovieAdmin from "./Admin/AdminMovies";
import MovieAdminCreate from "./Admin/AdminMoviesCreate";
import MovieAdminEdit from "./Admin/AdminMoviesEdit";
import ShowAdmin from "./Admin/AdminShows";
import ShowAdminCreate from "./Admin/AdminShowsCreate";
import ShowAdminEdit from "./Admin/AdminShowsEdit";
import AddEpisode from "./Admin/AddEpisode";
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
            <Route
              exact
              path="/shows/:id/episode/:episode"
              component={ShowPlayer}
            />
            <Route exact path="/shows/:id" component={SingleShow} />
            <Route exact path="/admin">
              <Redirect to="/admin/movies" />
            </Route>
            <Route exact path="/admin/movies" component={MovieAdmin} />
            <Route
              exact
              path="/admin/movies/create"
              component={MovieAdminCreate}
            />
            <Route exact path="/admin/movies/:id" component={MovieAdminEdit} />
            <Route exact path="/admin/shows" component={ShowAdmin} />
            <Route
              exact
              path="/admin/shows/create"
              component={ShowAdminCreate}
            />
            <Route
              exact
              path="/admin/shows/:id/addepisode"
              component={AddEpisode}
            />
            <Route exact path="/admin/shows/:id" component={ShowAdminEdit} />
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
