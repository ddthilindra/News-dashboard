import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard";
import News from "./Pages/News";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={News} />
          <Route path="/n" exact component={Dashboard} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
