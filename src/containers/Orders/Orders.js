import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import axios from "../../axios-orders";
import classes from "./Orders.module.css";

class Orders extends Component {
  state = {
    orders: [],
    activePage: 1,
  };

  componentDidMount() {
    // const query = '?orderBy="userId"&equalTo="'+ this.props.userId + '"';
    axios
      .get("/orders.json")
      .then((response) => {
        let fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            userId: response.data[key].userId,
            orderDetail: response.data[key].orderList,
          });
        }
        fetchedOrders = fetchedOrders.filter((order) => {
          return order.userId === this.props.userId;
        });
        this.setState({ orders: fetchedOrders });
      })
      .catch((error) => console.log(error));
  }

  pageChangeHandler = (event, page) => {
    console.dir(event.target);
    this.setState({ activePage: +page });
  };

  render() {
    let ordersArray = [];
    let pageCount = 0;
    let pageNumbers = [];
    pageCount = Math.ceil(this.state.orders.length / 5);
    let activeClass = " ";

    for (let i = 0; i < pageCount; i++) {
      if (i + 1 === this.state.activePage) {
        activeClass = classes.Active;
      } else {
        activeClass = " ";
      }
      pageNumbers.push(
        <span
          className={activeClass}
          onClick={(event) => this.pageChangeHandler(event, i + 1)}
          key={Math.random().toString()}
        >
          {i + 1}
        </span>
      );
    }
    let orderPerPage = 5;

    if (this.state.orders.length > 0) {
      for (
        let j = this.state.activePage * orderPerPage - orderPerPage;
        j < this.state.activePage * orderPerPage &&
        j < this.state.orders.length;
        j++
      ) {
        let order = this.state.orders[j];
        let orderItem = order.orderDetail.map((item, i) => (
          <tr key={i} className={classes.TableRow}>
            <td>{i + 1}</td>
            <td>
              <img className={classes.ImgItem} src={item.img} alt={item.name} />
            </td>
            <td>{item.name}</td>
            <td>{item.size ? item.size : "N/A"}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{(item.quantity * item.price).toFixed(2) + " $"}</td>
          </tr>
        ));

        let totalItemPrice = order.orderDetail
          .map((item) => item.quantity * item.price)
          .reduce((a, b) => a + b, 0);

        ordersArray.push(
          <div key={Math.random().toString()} className={classes.ItemSection}>
            <p>Ordered By {order.userId}</p>
            <table className={classes.OrderTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Order</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{orderItem}</tbody>
              <tfoot>
                <tr className={classes.FootRow}>
                  <td colSpan="6" style={{ textAlign: "right" }}>
                    <strong>Total:</strong>
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    {totalItemPrice.toFixed(2)} $
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      }
    }

    return (
      <div>
        {this.props.redirectRoute === "/logout" ? <Redirect to="/" /> : null}
        <div className={classes.OrderSection}>{ordersArray}</div>
        <div className={classes.PageSection}>{pageNumbers}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //   chartOrderList: state.chartOrderList,
    //   isEmptyOrder: state.isEmptyOrder,
    //   isSignedIn: state.isSignedIn,
    redirectRoute: state.redirectRoute,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Orders);
