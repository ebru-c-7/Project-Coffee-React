import React, { useState } from "react";

import classes from "./FormItem.module.css";

const FormItem = (props) => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");

  const checkValue = (op) => {
    let isValid;
    switch (props.id) {
      case "email":
        const pattern = /^\S+@\S+\.\S+$/;
        isValid = pattern.test(value);
        if (isValid) {
          setEmail(value);
          resetInput();
        } else {
          setMessage("Invalid e-mail address!");
        }
        break;
      case "email2":
        isValid = value === email;
        if (isValid) {
          resetInput();
        } else {
          setMessage("Not confirmed!");
        }
        break;
      case "password":
        isValid = value.trim().length > 5;
        if (isValid) {
          setPassword(value);
          resetInput();
        } else {
          setMessage("Should be more than 5 chars!");
        }
        break;
      case "password2":
        isValid = value === password;
        if (isValid) {
          resetInput();
        } else {
          setMessage("Not confirmed!");
        }
        break;
      case "username":
        let patternUN = /[a-z][0-9]/i;
        isValid = value.trim().length > 5 && patternUN.test(value);
        if (isValid) {
          setUserName(value);
          resetInput();
        } else {
          setMessage("Should be more than 5 chars and both numbers & letters!");
        }
        break;
      default:
        break;
    }
    if (isValid) props.clicked(op);
  };

  const resetInput = () => {
    setValue("");
    setMessage("");
  };

  let formItem = (
    <div>
      <div>
        <label className={classes.Label}>{props.label}</label>
        <input
          id={props.id}
          type={props.type}
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
      </div>
      <div>
        <label className={classes.Message}>{message}</label>
      </div>
      <div className={classes.ButtonContainer}>
        <button
          onClick={() => props.clicked("back")}
          className={classes.ButtonBack}
        >
          {"<"}
        </button>
        <button
          onClick={() => checkValue("next")}
          className={classes.ButtonNext}
        >
          {">"}
        </button>
      </div>
    </div>
  );

  return (
    <div className={classes.Form}>
      {props.isVisible ? formItem : null}
      <button
        className={classes.ButtonSend}
        onClick={props.submitForm.bind(null, email, password, userName)}
        style={!(email && password && userName) ? { display: "none" } : null}
      >
        Send Info
      </button>
    </div>
  );
};

export default FormItem;
