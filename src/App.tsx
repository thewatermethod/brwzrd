import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import New from "./components/New";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <New />
          </Route>
          <Route exact path="/new">
            <New />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
