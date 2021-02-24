import React, { Component } from "react";
import AddQ from "./AddQ";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Quiz from "./Quiz";
import Home from "./Home";
import { ReactComponent as ReactLogo } from "./pics/homepage.svg";
import IconButton from "@material-ui/core/IconButton";

class App extends Component {
  render() {
    return (
      <Router>
        <IconButton href="/">
          <ReactLogo />
        </IconButton>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <AddQ />
          </Route>
          <Route path="/questions/:season/:episode" component={Quiz} />
        </Switch>
      </Router>
    );
  }
}

export default App;
