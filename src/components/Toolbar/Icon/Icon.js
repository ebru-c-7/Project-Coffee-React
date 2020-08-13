import React from "react";

const icon = (props) => {
  let element;

  switch (props.type) {
    case "img":
      element = (<img src={props.logo} alt={props.def} />);
      break;
    case "icon":
      element = (<i className={props.class} onClick={props.open}></i>);
      break;
    default:
  }

  return element;
};

export default icon;
