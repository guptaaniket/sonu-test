import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Home from "./pages/home";

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route component={PageNotFound}></Route>
    </Switch>
    </div>
  );
}

export default App;
