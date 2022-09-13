import { ThemeProvider } from "@material-ui/core";
import  Category  from "./Pages/Category";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard";
import Editors from "./Pages/Editors";
import Login from "./Pages/Login";
import News from "./Pages/News";

function App() {
  // if (localStorage.getItem("isLoggedIn")) {
    return (
    <>

      {/* <Router>
        <Switch>
        </Switch>
      </Router> */}
      <Router>
          <Switch>
          <Route path="/" exact component={Login} />
        
            <Route path="/news" exact component={News} />
            <Route path="/editors" exact component={Editors} />
            <Route path="/category" exact component={Category} />
          </Switch>
        {/* </Layout> */}
      </Router>
    </>
    );
  // } else {
    // return (
    // );
  // }
}

export default App;
