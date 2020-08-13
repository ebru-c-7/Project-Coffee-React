import React from "react";
import classes from "./Chart.module.css";

import Backdrop from "../../UI/Backdrop/Backdrop";
import Button from "../../UI/Button/Button";

const chart = (props) => {
  const chartOrderList = props.orderList.map((order, i) => (
    <tr key={i} className={classes.BodyRow}>
      <td className={classes.OrderNo}>{i + 1}</td>
      <td>
        <img className={classes.OrderImg} src={order.img} alt={order.name} />
      </td>
      <td className={classes.OrderName}>{order.name}</td>
      <td className={classes.OrderSize}>{order.size}</td>
      <td className={classes.Quantity}>{order.quantity}</td>
      <td className={classes.OrderPrice}>{order.price}</td>
      <td className={classes.OrderPrice}>
        {(order.quantity * order.price).toFixed(2) + " $"}
      </td>
      <td className={classes.OrderCancel} onClick={() => props.deleteOrder(i)}>
        x
      </td>
    </tr>
  ));

  let subTotal = props.orderList
    .map((order) => order.price * order.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <div>
      {props.state ? (
        <Backdrop show={props.open} clicked={props.close} />
      ) : null}
      <div className={classes.Chart}>
        <section className={classes.OrderSection}>
          <table className={classes.OrderSectionTable}>
            <thead>
              <tr className={classes.HeadRow}>
                <th>No</th>
                <th>Order</th>
                <th>Name</th>
                <th>Size</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={classes.ChartTable}>{chartOrderList}</tbody>
            <tfoot>
              <tr className={classes.FootRow}>
                <td colSpan="6">Sub Total:</td>
                <td className={classes.ChartSubtotal}>{subTotal.toFixed(2)} $</td>
              </tr>
            </tfoot>
          </table>
        </section>
        <section className={classes.OperationSection}>
          <Button class={classes.OperationSectionButton} type="cancel" clicked={props.deleteChart} >Clear Chart</Button>
          <Button class={classes.OperationSectionButton} type="confirm" clicked={props.submitOrder}>Submit Order</Button>
        </section>
      </div>
    </div>
  );
};

export default chart;
