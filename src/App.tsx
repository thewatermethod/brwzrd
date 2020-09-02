import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import New from "./components/New";
import Brew from "./components/Brew";
import Landing from "./components/Landing";

import {ReactComponent as Moon} from "./moon.svg";

const App = () => {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1 className="main-heading">
            <Link to="/">BRWZRD</Link>
          </h1>
          <nav>
            <Link to="/new">Create a new brew</Link>
          </nav>
          <button className="dark-mode">
            <Moon />
          </button>
        </header>

        <div>
          <Switch>
            <Route exact path="/">
              <Landing />
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
