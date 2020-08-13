import React from "react";

import classes from "./Button.module.css";

const button = (props) => {
  let button;
  switch (props.type) {
    case "cancel":
      button = (
        <button
          className={
            props.class
              ? [classes.ButtonCancel, props.class].join(" ")
              : classes.ButtonCancel
          }
          onClick={props.clicked}
        >
          {props.children}
        </button>
      );
      break;
    case "confirm":
      button = (
        <button
          className={
            props.class
              ? [classes.ButtonConfirm, props.class].join(" ")
              : classes.ButtonConfirm
          }
          onClick={props.clicked}
        >
          {props.children}
        </button>
      );
      break;
    default:
      return;
  }

  return button;
};

export default button;
