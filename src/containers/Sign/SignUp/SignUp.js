import React, { Component } from "react";
// import axios from "../../../axios-orders";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/actions";
import classes from "./SignUp.module.css";
import Icon from "../../../components/Toolbar/Icon/Icon";
import FormItem from "./FormItem/FormItem";

class SignUp extends Component {
  state = {
    email: null,
    password: null,
    userName: null,
    activeStep: 0,
    form: [
      { label: "E-Mail:", id: "email", type: "email" },
      { label: "Confirm E-Mail:", id: "email2", type: "email" },
      { label: "Password:", id: "password", type: "password" },
      { label: "Confirm Password:", id: "password2", type: "password" },
      { label: "User Name:", id: "username", type: "text" },
    ],
    isVisible: true,
  };

  changeForm = (operation) => {
    let activeForm = this.state.activeStep;
    let formItemCount = this.state.form.length - 1;
    if (operation === "back") {
      if (activeForm === 0) {
        return;
      } else {
        this.setState({ activeStep: activeForm - 1 });
      }
    } else if (operation === "next") {
      if (activeForm === formItemCount) {
        this.setState({ isVisible: false });
        return;
      } else {
        this.setState({ activeStep: activeForm + 1 });
      }
    }
  };

  submitForm = (email, password, username) => {
    let data = {
      email: email,
      password: password,
      username: username,
    };

    this.setState({
      email: data.email,
      password: data.password,
      userName: data.username,
    });

    this.props.onSignUp(email, password, "signup", username);

  };

  render() {
    let activeForm = this.state.form[this.state.activeStep];
    let message = "Please fill the form to join us!";
    if (!this.state.isVisible) {
      message = "Now, send the info to complete the process!";
    }
    return (
      <div className={classes.SignContainer}>
        {this.state.userName && this.state.email && this.state.password ? (
          <Redirect to="/sign-in" />
        ) : null}
        <div className={classes.Icon}>
          <Icon type="img" logo="/img/starbucks-icon.png" def="company-logo" />
        </div>
        <h1 className={classes.Text}>{message}</h1>
        <FormItem
          label={activeForm.label}
          id={activeForm.id}
          changed={this.inputChangeHandler}
          type={activeForm.type}
          clicked={this.changeForm}
          submitForm={this.submitForm}
          isVisible={this.state.isVisible}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (mail, password, method, username) => dispatch(actions.authStart(mail, password, method, username)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
