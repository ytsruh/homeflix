import React from "react";
//Components
import Protected from "./Components/ProtectedRoutes";
import NotFound from "./Components/NotFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router className="mx-5">
        <Switch>
          <Protected />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
