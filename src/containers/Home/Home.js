import React, { Component } from "react";
import {connect } from "react-redux";

import News from "../../components/News/News";
import MenuBoard from "../../components/MenuBoard/MenuBoard";
import SubMenu from "../../components/MenuBoard/SubMenu/SubMenu";
import * as actions from "../../store/actions/actions";

class Home extends Component {
  state = {
    // isSubMenuOpen: false,
    activeMenu: null,
    activeMenuName: "",
  };

  subMenuHandler = (menu, name) => {
    this.props.onToggleSubMenu(true);
    // this.setState({ isSubMenuOpen: true });
    this.setState({ activeMenu: menu });
    this.setState({ activeMenuName: name });
  };

  subMenuCloseHandler = () => {
    // this.setState({ isSubMenuOpen: false });
    this.props.onToggleSubMenu(false);
  };

  render() {
    return (
      <div>
        <News />
        <MenuBoard
          subMenuClick={this.subMenuHandler}
          open={this.props.isSubMenuOpen}
        />
        {this.props.isSubMenuOpen ? (
          <SubMenu
            menu={this.state.activeMenu}
            type={this.state.activeMenuName}
            open={this.props.isSubMenuOpen}
            close={this.subMenuCloseHandler}
            sendOrder={this.props.onSendOrder}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chartOrderList: state.chartOrderList,
    isSubMenuOpen: state.isSubMenuOpen
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSendOrder: (order) => dispatch(actions.addProduct(order)),
    onToggleSubMenu: (isOpen) => dispatch(actions.toggleSubMenu(isOpen))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
