import React, { Component } from "react";

import classes from "./SignUp.module.css";
import Icon from "../../../components/Toolbar/Icon/Icon";
import Button from "../../../components/UI/Button/Button";
// import * as actions from "../../../store/actions/actions";

class SignUp extends Component {
  state = {
    email: null,
    email2: null,
    password: null,
    password2: null,
    userName: null,
  };

  checkUser = (event) => {
    event.preventDefault();
  };

  inputChangeHandler = (event) => {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "email2":
        this.setState({ email2: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "password2":
        this.setState({ password2: event.target.value });
        break;
      case "username":
        this.setState({ userName: event.target.value });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className={classes.SignContainer}>
        <div className={classes.Icon}>
          <Icon type="img" logo="/img/starbucks-icon.png" def="company-logo" />
        </div>
        <h1 className={classes.Text}>Please fill the form to join us!</h1>
        <form className={classes.Form}>
          <div>
            <label>E-Mail:</label>
            <input
              id="email2"
              onChange={(event) => this.inputChangeHandler(event)}
              type="email"
            />
            <label>Result</label>
          </div>
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
          <div>
            <label>Password:</label>
            <input
              id="password2"
              onChange={(event) => this.inputChangeHandler(event)}
              type="password"
            />
            <label>Result</label>
          </div>
          <div>
            <label>User Name:</label>
            <input
              id="username"
              onChange={(event) => this.inputChangeHandler(event)}
              type="text"
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

export default SignUp;
