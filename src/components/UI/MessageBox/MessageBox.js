import React from "react";

import classes from "./MessageBox.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

const messageBox = (props) => {
  let buttons = [
    <Button key="1" clicked={props.cancel} class={classes.Button} type="cancel">
      {props.cancelButton ? props.cancelButton : "Cancel"}
    </Button>,
    <Button key="2" clicked={props.confirm} class={classes.Button} type="confirm">
      {props.confirmButton ? props.confirmButton : "Clear All"}
    </Button>,
  ];

  if (props.type === "info") {
    buttons = (
      <Button key="3" clicked={props.confirm} class={classes.Button} type="confirm">
        OK
      </Button>
    );
  }

  return (
    <div>
      <Backdrop style={{ zIndex: 103 }} show={true} clicked={props.close} />
      <div className={classes.MessageBox} style={props.style}>
        <div className={classes.MessageBoxImgBox}>
          <img
            className={classes.MessageBoxImg}
            src={props.img ? props.img : "./img/mb/sign.png"}
            alt="message-box"
          />
        </div>
        <div className={classes.Operation}>
          <p className={classes.MessageBoxMessage}>{props.children}</p>
          {props.listElement ? 
            <ol className={classes.orderList}>
              {props.listElement}
            </ol> : null}
          <div className={classes.Buttons}>{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default messageBox;
