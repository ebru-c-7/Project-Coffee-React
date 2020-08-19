import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideDrawer.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import Icon from "../Toolbar/Icon/Icon";

const sideDrawer = (props) => {
  //open={this.state.isSideDrawerOpen} close={this.sideDrawerCloseHandler}
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <div>
      <Backdrop show={props.open} clicked={props.close} />
      <div className={attachedClasses.join(" ")} onClick={props.close}>
        <div className={classes.Icon}>
          <Icon type="img" logo="/img/starbucks-icon.png" def="company-logo" />
          {props.userName ? <p>Welcome, {props.userName}!</p> : null}
        </div>

        {props.isSignedIn ? null : (
          <div className={classes.ListElement}>
            <NavLink className={classes.Link} to="/sign-in">
              Sign In
            </NavLink>
          </div>
        )}
        <div>
          <ul className={classes.List}>
            <li className={classes.ListElement}>
              <NavLink
                activeClassName={classes.LinkActive}
                className={classes.Link}
                to="/"
                exact
              >
                Home
              </NavLink>
            </li>
            {props.isSignedIn ? (
              <li className={classes.ListElement}>
                <NavLink
                  activeClassName={classes.LinkActive}
                  className={classes.Link}
                  to="/orders"
                  exact
                >
                  Orders
                </NavLink>
              </li>
            ) : null}
            {props.isSignedIn ? (
              <div className={classes.ButtonContainer}>
                <button className={classes.Button} onClick={props.logout}>
                  Log Out
                </button>
              </div>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default sideDrawer;
