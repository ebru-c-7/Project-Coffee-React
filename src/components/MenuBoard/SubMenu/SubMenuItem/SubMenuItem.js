import React, { useState } from "react";
import classes from "./SubMenuItem.module.css";

const SubMenuItem = (props) => {
  const [size, setSize] = useState("Short");
  const [quantity, setQuantity] = useState(1);

  let price =
    props.type !== "Drink" ? props.price.toFixed(2) : props.price[size].toFixed(2);

  const priceHandler = (event) => {
    setSize(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  let selectOption =
    props.type === "Drink" ? (
      <select name="size" className="cup-size" onChange={priceHandler}>
        <option value="Short">Short</option>
        <option value="Tall">Tall</option>
        <option value="Grande">Grande</option>
        <option value="Venti">Venti</option>
      </select>
    ) : null;

  let itemOrdered = {
    name: props.name,
    type: props.type,
    quantity: +quantity,
    price:price,
    size: props.type === "Drink" ? size : null,
    img:props.img
  };

  return (
    <div className={classes.SubmenuItem}>
      <img src={props.img} alt={props.alt} />
      <p>{props.name}</p>
      {selectOption}
      <input value={price + " $"} disabled />
      <input type="number" value={quantity} onChange={quantityHandler} />
      <button
        className="button-add"
        onClick={props.addItemHandler.bind(null, itemOrdered)}
      >
        Add
      </button>
    </div>
  );
};

export default SubMenuItem;
