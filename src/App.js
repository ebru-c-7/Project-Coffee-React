import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";

import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./containers/Home/Home";
import Orders from "./containers/Orders/Orders";
import SignIn from "./containers/Sign/SignIn";
import SignUp from "./containers/Sign/SignUp/SignUp";
import MessageBox from "./components/UI/MessageBox/MessageBox";
import * as actions from "./store/actions/actions";

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }

  errorMessageHandler() {
    let message;
    switch(this.props.error) {
      case "INVALID_PASSWORD": message= "You entered invalid password!"; break;
      case "MISSING_PASSWORD": message= "Please enter your password!"; break;
      case "MISSING_EMAIL": message= "Please enter your e-mail!"; break;
      case "EMAIL_NOT_FOUND": message= "This account does not exist!"; break;
      default: message= "There is a problem with your account! Please try again"; break;
    }

    return <MessageBox style={{top: "100vh"}}
          type="info"
          confirm={() => this.props.onErrorHandled()}
          close={()=> this.props.onErrorHandled()}
        >
          {message}
        </MessageBox>
  }

  render() {
    let errorMessageBox = null;
    if(this.props.error) {
      errorMessageBox = this.errorMessageHandler();
    }
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
        {this.props.error ? errorMessageBox :
        <Layout> 
          {routes}
        </Layout>}
      </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    redirectRoute: state.redirectRoute,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(actions.autoSignIn()),
    onErrorHandled: () => dispatch(actions.errorHandled())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
