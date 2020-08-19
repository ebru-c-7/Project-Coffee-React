import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";

import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import SignIn from "./containers/Sign/SignIn";
import SignUp from "./containers/Sign/SignUp/SignUp";
import * as actions from "./store/actions/actions";

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render() {
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(actions.autoSignIn())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
