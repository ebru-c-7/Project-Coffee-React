import React from 'react';
import {NavLink} from "react-router-dom";

import classes from "./SideDrawer.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";

const sideDrawer = (props) => { //open={this.state.isSideDrawerOpen} close={this.sideDrawerCloseHandler}
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <div>
            <Backdrop show={props.open} clicked={props.close} />
            <div className={attachedClasses.join(" ")} onClick={props.close} >
                <ul>
                    <li>
                        <NavLink to="/" exact >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" exact >Orders</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default sideDrawer;