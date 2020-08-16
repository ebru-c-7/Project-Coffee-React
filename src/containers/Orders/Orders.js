import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import classes from "./Orders.module.css";

class Orders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    // const query = '?orderBy="userId"&equalTo="'+ this.props.userId + '"';

    axios
      .get("/orders.json")
      .then((response) => {
        console.log(response.data);
        let fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            userId: response.data[key].userId,
            orderDetail: response.data[key].orderList,
          });
        }
        fetchedOrders = fetchedOrders.filter(order => order.userId === this.props.userId);
        this.setState({ orders: fetchedOrders });
        console.log(fetchedOrders);
      })
      .catch((error) => console.log(error));
  }

  render() {
    let ordersArray = [];

    for (let order of this.state.orders) {
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
        <div key={order.userId} className={classes.ItemSection}>
          <p>{order.userId}</p>
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
    return <div className={classes.OrderSection}>{ordersArray}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
  //   chartOrderList: state.chartOrderList,
  //   isEmptyOrder: state.isEmptyOrder,
  //   isSignedIn: state.isSignedIn,
    // redirectRoute: state.redirectRoute,
    userId: state.userId
  };
};

export default connect(mapStateToProps)(Orders);
