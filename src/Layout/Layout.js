import React, { Component } from "react";
import axios from "../axios-orders";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SideDrawer from "../components/SideDrawer/SideDrawer";
import Toolbar from "../components/Toolbar/Toolbar";
import MessageBox from "../components/UI/MessageBox/MessageBox";
import classes from "./Layout.module.css";
import * as actions from "../store/actions/actions";

class Layout extends Component {
  state = {
    isSideDrawerOpen: false,
    messsageBoxElement: null
  };

  sideDrawerCloseHandler = () => {
    this.setState({ isSideDrawerOpen: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { isSideDrawerOpen: !prevState.isSideDrawerOpen };
    });
  };

  // componentDidUpdate() {
  //   console.log(this.props.newUser);
  //   if(this.props.newUser) {
  //     this.addNewUserHandler();
  //   }
  // }

  addToChartMessageHandler = () => {
    this.props.onEmptyOrder();
    let message = "Please first add item to send to chart!";
    this.setState({
      messsageBoxElement: (
        <MessageBox
          type="info"
          confirm={() => this.setState({ messsageBoxElement: null })}
          close={() => this.setState({ messsageBoxElement: null })}
        >
          {message}
        </MessageBox>
      ),
    });
  };

  deleteChartOrderItemHandler = (index) => {
    this.props.onDeleteItem(index);
  };

  deleteAllChartMessageHandler = () => {
    let message = "Do you want to clear all the items in the chart?";
    this.setState({
      messsageBoxElement: (
        <MessageBox
          confirm={this.deleteAllChartHandler}
          close={() => this.setState({ messsageBoxElement: null })}
          cancel={() => this.setState({ messsageBoxElement: null })}
          img="./img/mb/warning.png"
        >
          {message}
        </MessageBox>
      ),
    });
  };

  deleteAllChartHandler = () => {
    this.props.onClearAll();
    this.setState({ messsageBoxElement: null });
  };

  submitOrderHandler = () => {
    let data = {
      orderList: this.props.chartOrderList,
      userId: this.props.userId
    };
    axios
      .post("/orders.json", data )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    this.deleteAllChartHandler();
  };

  submitOrderMessageHandler = () => {
    let orderDetail = [];
      let i = 0;
      for (let order of this.props.chartOrderList) {
        orderDetail.push(
          <li key={++i}>
            {order.name} {order.type === "Drink" ? order.size : null} -{" "}
            {order.quantity} x {order.price} ={" "}
            {(order.quantity * order.price).toFixed(2)} $
          </li>
        );
      }
    if (this.props.isSignedIn) {
      this.props.onSignIn(null);
      this.props.chartOrderList.userId = this.props.userId;
      let message = `Please review your order below before submitting! 
      Thank you for choosing us! Total ${this.props.chartOrderList
        .map((order) => order.price * order.quantity)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)} $`;
      this.setState({
        messsageBoxElement: (
          <MessageBox
            confirm={this.submitOrderHandler}
            close={() => this.setState({ messsageBoxElement: null })}
            cancel={() => this.setState({ messsageBoxElement: null })}
            img="./img/mb/end.png"
            listElement={orderDetail}
            style={{ height: "20rem" }}
            confirmButton="Send Order"
            cancelButton="Cancel"
          >
            {message}
          </MessageBox>
        ),
      });
    } else {
      console.log("sign in Layout");
      this.props.onSignIn("/sign-in");
    }
  };

  addNewUserHandler = () => {
    axios.post("/users.json", this.props.newUser);
    this.props.onClearNewUser();
  }

  render() {
    let numofOrders = 0;
    if (this.props.chartOrderList) {
      numofOrders = this.props.chartOrderList
        .map((order) => order.quantity)
        .reduce((a, b) => a + b, 0);
    }
    let messageEl = null;
    if (this.props.isEmptyOrder) {
      // this.addToChartMessageHandler();
      let message = "Please first add item to send to chart!";
      messageEl = (
        <MessageBox
          type="info"
          confirm={() => this.props.onEmptyOrder(false)}
          close={() => this.props.onEmptyOrder(false)}
        >
          {message}
        </MessageBox>
      );
    }

    return (
      <div>
        {this.props.redirectRoute ? <Redirect to={this.props.redirectRoute} /> : null}
        {messageEl}
        {this.state.messsageBoxElement}
        <Toolbar
          orderList={this.props.chartOrderList}
          numofOrders={numofOrders}
          drawerToggleClicked={this.sideDrawerToggleHandler}
          deleteOrderItem={this.deleteChartOrderItemHandler}
          deleteOrderAll={this.deleteAllChartMessageHandler}
          submitOrder={this.submitOrderMessageHandler}
          isMessageBoxOpen={this.state.messsageBoxElement || this.props.redirectRoute ==="/sign-in" ? true : false}
        />
        <SideDrawer
          open={this.state.isSideDrawerOpen}
          close={this.sideDrawerCloseHandler}
          isSignedIn={this.props.isSignedIn}
          logout={this.props.onLogout}
          userName={this.props.userId}
        />
        <div className={classes.Content}>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartOrderList: state.chartOrderList,
    isEmptyOrder: state.isEmptyOrder,
    isSignedIn: state.isSignedIn,
    redirectRoute: state.redirectRoute,
    userId: state.userId,
    // newUser: state.newUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteItem: (index) => dispatch(actions.deleteProduct(index)),
    onEmptyOrder: () => dispatch(actions.emptyOrder()),
    onClearAll: () => dispatch(actions.clearAll()),
    onSignIn: (route) => dispatch(actions.signIn(route)),
    onLogout: () => dispatch(actions.logout()),
    // onClearNewUser: () => dispatch(actions.newUser(null, null))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
