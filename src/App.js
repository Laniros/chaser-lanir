import React, { Component } from "react";
import AddQ from "./AddQ";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Quiz from "./Quiz";
import Home from "./Home";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
const icon = (
  <Icon>
    <img alt="" src="./pics/homepage.svg" className="filter-green" />
  </Icon>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Button
          startIcon={icon}
          style={{ color: "white", height: "40px" }}
          href="/"
        ></Button>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add">
          <AddQ />
        </Route>
        <Route path="/questions/:season/:episode" component={Quiz} />
      </Router>
    );
  }
}

export default App;
