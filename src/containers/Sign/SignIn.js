import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import classes from "./SignIn.module.css";
import Icon from "../../components/Toolbar/Icon/Icon";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/actions";

class SignIn extends Component {
  state = {
    email: null,
    password: null,
  };

  checkUser = (event) => {
    event.preventDefault();
    this.props.onSignInCheck(this.state.email, this.state.password);
  };

  inputChangeHandler = (event) => {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className={classes.SignContainer}>
        {this.props.redirectRoute && this.props.isSignedIn ? <Redirect to={this.props.redirectRoute} /> : null}
        <div className={classes.Icon}>
          <Icon type="img" logo="/img/starbucks-icon.png" def="company-logo" />
        </div>
        <h1 className={classes.Text}>Already have an account? Sign In! Or <NavLink className={classes.SignUpText} to="/sign-up">Join Us!</NavLink></h1>
        <form className={classes.Form}>
          <div>
            <label>E-Mail:</label>
            <input
              id="email"
              onChange={(event) => this.inputChangeHandler(event)}
              type="email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              id="password"
              onChange={(event) => this.inputChangeHandler(event)}
              type="password"
            />
          </div>
          <Button
            clicked={this.checkUser}
            class={classes.Button}
            type="confirm"
          >
            SEND
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
    //   chartOrderList: state.chartOrderList,
    //   isEmptyOrder: state.isEmptyOrder,
      isSignedIn: state.isSignedIn,
      redirectRoute: state.redirectRoute,
      userId: state.userId
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSignInCheck: (mail, pass) => dispatch(actions.signInCheck(mail, pass)) 
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

