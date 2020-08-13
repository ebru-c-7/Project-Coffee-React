import React from "react";
import * as subMenu from "./MenuAll";
import MenuItem from "./MenuItem/MenuItem";
import classes from "./MenuBoard.module.css";

const menu = [
  {
    name: "Drink",
    img: "./img/menu/drink.jpg",
    source: subMenu.drinkMenu,
    class: classes.Drink,
  },
  {
    name: "Food",
    img: "./img/menu/food.JPG",
    source: subMenu.foodMenu,
    class: classes.Food,
  },
  {
    name: "Merchandise",
    img: "./img/menu/merchandise.jpg",
    source: subMenu.merchMenu,
    class: classes.Merchandise,
  },
  {
    name: "Whole Beans",
    img: "./img/menu/at-home-coffee.JPG",
    source: subMenu.beansMenu,
    class: classes.Beans,
  },
];

const menuBoard = (props) => {
  const items = menu.map((item) => (
    <MenuItem
      show={props.open}
      clicked={props.subMenuClick.bind(null, item.source, item.name)}
      key={item.name}
      class={item.class}
      logo={item.img}
      def={item.name}
    >
      {item.name}
    </MenuItem>
  ));

  return (
    <section className={classes.Menu}>
      <h2>Menu</h2>
      {items}
    </section>
  );
};

export default menuBoard;
