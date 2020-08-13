import React from "react";
// import classes from "./MenuItem.css";

const menuItem = (props) => {
    let element = (
        <div className={props.class} onClick={props.clicked} >
            <img src={props.logo} alt={props.def} />
            <h4>{props.children}</h4>
        </div>
    );
    return element;
};

export default menuItem;