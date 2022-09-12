import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard";
import Editors from "./Pages/Editors";
import News from "./Pages/News";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/news" exact component={News} />
          <Route path="/editors" exact component={Editors} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
