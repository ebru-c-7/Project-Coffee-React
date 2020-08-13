import React, { useState } from "react";
import classes from "./SubMenu.module.css";
import SubMenuItem from "./SubMenuItem/SubMenuItem";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Button from "../../UI/Button/Button";
import MessageBox from "../../UI/MessageBox/MessageBox";

const SubMenu = (props) => {
  const [tempList, setTempList] = useState([]);
  const [isValid, setisValid] = useState(true);

  const addItemHandler = (order) => {
    let isValid = checkValidity(order.quantity);
    if(isValid) {
    let index = checkDoubleEntry(order.name, order.size);
    if (index < 0) {
      setTempList((prevState) => [...prevState, order]);
    } else {
      let orders = [...tempList];
      orders[index].quantity += order.quantity;
      setTempList(orders);
    }}
  };

  const checkValidity = (quantity) => {
    if (+quantity > 0 && +quantity < 10) {
      return true;
    }
    else { 
      setisValid(false);
      return false; 
    }
  }

  const deleteItemHandler = (i) => {
    let updatedTempList = [...tempList];
    updatedTempList.splice(i, 1);
    setTempList(updatedTempList);
  };

  const checkDoubleEntry = (name, size) => {
    for (let [i, item] of tempList.entries()) {
      if (item.name === name && item.size === size) {
        return i;
      }
    }
    return -1;
  };

  let menuItems = props.menu.map((item) => (
    <SubMenuItem
      addItemHandler={addItemHandler}
      type={props.type}
      key={item.name}
      name={item.name}
      img={item.img}
      price={item.price}
    />
  ));

  let tempListSummary = tempList.map((order, i) => {
    return (
      <div key={i} className={classes.DivInline}>
        <li>
          {order.name} {order.type === "Drink" ? order.size : null} -{" "}
          {order.quantity} x {order.price} ={" "}
          {(order.quantity * order.price).toFixed(2)} $
        </li>
        <button
          className={classes.ButtonInline}
          onClick={() => deleteItemHandler(i)}
        >
          x
        </button>
      </div>
    );
  });

  let subTotal = tempList
    .map((order) => order.quantity * order.price)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  let messageEl = null;
  if(!isValid) {
    let message = "Please enter a valid quantity between 1-9!";
    messageEl = (
        <MessageBox
          type="info"
          confirm={() => setisValid(true)}
          close={()=> setisValid(true)}
        >
          {message}
        </MessageBox>);
  }

  return (
    <div>
      {messageEl}
      <Backdrop show={props.open} clicked={props.close} />
      <div className={classes.Submenu}>
        <div className={classes.MenuItems}>{menuItems}</div>
        <div className={classes.SubmenuResult}>
          <div className={classes.SubmenuResultText}>
            <p>Products to be sent to the chart:</p>
            <ol className={classes.OrderList}>{tempListSummary}</ol>
          </div>
          <div className={classes.SubtotalArea}>
            <label>Sub Total:</label>
            <input
              className={classes.InputValue}
              value={subTotal + " $"}
              disabled
            />
          </div>
          <Button type="cancel" clicked={props.close}>Cancel</Button>
          <Button type="confirm" clicked={props.sendOrder.bind(null,tempList)}>Send to Chart</Button>
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
