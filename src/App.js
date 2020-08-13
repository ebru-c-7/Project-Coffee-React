import React from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  let routes = (
    <Switch>
      <Route path="/orders" component={Orders} />
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
