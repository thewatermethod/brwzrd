import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import New from "./components/New";
import Brew from "./components/Brew";
import Landing from "./components/Landing";

import {ReactComponent as Moon} from "./moon.svg";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const darkModeRules = [
    {property: "--color", value: "#0097fc"},
    {property: "--color-accent", value: "#0097fc4f"},
    {property: "--color-bg", value: "#333"},
    {property: "--color-bg-secondary", value: "#555"},
    {property: "--color-secondary", value: "#e20de9"},
    {property: "--color-secondary-accent", value: "#e20de94f"},
    {property: "--color-shadow", value: "#bbbbbb20"},
    {property: "--color-text", value: "#f7f7f7"},
    {property: "--color-text-secondary", value: "#aaa"},
  ];

  const lightModeRules = [
    {property: "--color", value: "#118bee"},
    {property: "--color-accent", value: "#118bee0b"},
    {property: "--color-bg", value: "#fff"},
    {property: "--color-bg-secondary", value: "e9e9e9"},
    {property: "--color-secondary", value: "#920de9"},
    {property: "--color-secondary-accent", value: "#920de90b"},
    {property: "--color-shadow", value: "#f4f4f4"},
    {property: "--color-text", value: "#000"},
    {property: "--color-text-secondary", value: "#999"},
  ];

  const switchColorMode = () => {
    const root = document.querySelector<HTMLElement>(":root");

    setDarkMode(!darkMode);

    if (root && darkMode) {
      darkModeRules.forEach((rule) => {
        root.style.setProperty(rule.property, rule.value);
      });
    } else if (root && !darkMode) {
      lightModeRules.forEach((rule) => {
        root.style.setProperty(rule.property, rule.value);
      });
    }
  };

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
          <button onClick={switchColorMode} className="dark-mode">
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
