import React, { Component } from "react";
import AddQ from "./AddQ";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Quiz from "./Quiz";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <Router>
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
