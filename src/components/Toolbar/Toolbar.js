import React, { useState, useEffect } from "react";
import classes from "./Toolbar.module.css";

import Store from "./Store/Store";
import Icon from "./Icon/Icon";
import Chart from "./Chart/Chart";

const Toolbar = (props) => {
  const [isChartOpen, setisChartOpen] = useState(false);
  const stores = ["Levent", "Şişli", "Kadköy", "Maslak"];
  let style = {
    visibility: "hidden",
  };

  if (props.numofOrders > 0) {
    style = null;
  }

  const chartElement =
    isChartOpen && props.orderList.length > 0 ? (
      !props.isMessageBoxOpen ? (
        <Chart
          open={() => setisChartOpen(true)}
          close={() => setisChartOpen(false)}
          orderList={props.orderList}
          state={isChartOpen}
          deleteOrder={props.deleteOrderItem}
          deleteChart={props.deleteOrderAll}
          submitOrder={props.submitOrder}
        />
      ) : null
    ) : null;

  const chartOpenHandler = () => {
    if (props.orderList.length > 0) {
      setisChartOpen(true);
    }
  };

  useEffect(() => {
    return () => {
      if (props.orderList.length === 0) {
        setisChartOpen(false);
      }
    };
  });

  return (
    <div>
      <nav className={classes.Toolbar}>
        <div className={classes.Cart} onClick={props.drawerToggleClicked}>
          <Icon
            type="icon"
            class={["fa fa-angle-double-right", classes.Drawer].join(" ")}
          />
        </div>
        <div className={classes.Icon}>
          <Icon type="img" logo="/img/starbucks-icon.png" def="company-logo" />
        </div>
        <Store stores={stores} />
        <div className={classes.Cart}>
          <Icon
            open={chartOpenHandler}
            type="icon"
            class={["fa fa-shopping-cart", classes.Cart].join(" ")}
          />
          <span style={style}> {props.numofOrders} </span>
        </div>
      </nav>
      {chartElement}
    </div>
  );
};

export default Toolbar;
