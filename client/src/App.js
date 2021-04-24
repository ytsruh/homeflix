import React from "react";
//Components
import Protected from "./Components/ProtectedRoutes";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import Logout from "./Components/Logout";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router className="mx-5">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Protected />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
