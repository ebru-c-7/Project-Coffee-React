import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import SignIn from "./containers/Sign/SignIn";
import SignUp from "./containers/Sign/SignUp/SignUp";

function App() {
  let routes = (
    <Switch>
      <Route path="/orders" component={Orders} />
      <Route path="/sign-in" component={SignIn}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/" component={Home} />
      <Redirect to="/"/>
    </Switch>
  );

  return (
      <div className="App">
        <Layout> 
          {routes}
        </Layout>
      </div>
  );
}


export default App;
