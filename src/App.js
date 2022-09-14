import Category from "./Pages/Category";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editors from "./Pages/Editors";
import Login from "./Pages/Login";
import News from "./Pages/News";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/news" exact component={News} />
          <Route path="/editors" exact component={Editors} />
          <Route path="/category" exact component={Category} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
