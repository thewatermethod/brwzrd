import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import New from "./components/New";
import Brew from "./components/Brew";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-heading">BRWZRD</h1>
      </header>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <New />
            </Route>
            <Route exact path="/new">
              <New />
            </Route>
            <Route exact path="/brew/:id">
              <Brew />
            </Route>
          </Switch>
        </div>
      </Router>
      <footer></footer>
    </div>
  );
};

export default App;
