import * as actionTypes from "../actions/actionTypes";

const initialState = {
  chartOrderList: [],
  isEmptyOrder: false,
  isSubMenuOpen: false,
  isSignedIn: false,
  redirectRoute: null,
  userId: null,
  token: null,
  error: null,
  users: [],
  newUser: null
};

const addToChartHandler = (state, action) => {
  if (action.order.length === 0) {
    return { ...state, isEmptyOrder: true };
  }
  return {
    ...state,
    isEmptyOrder: false,
    isSubMenuOpen: false,
    chartOrderList: [...state.chartOrderList, ...action.order],
  };
};

const deleteItemHandler = (state, action) => {
  let updatedOrderList = [...state.chartOrderList];
  updatedOrderList.splice(action.index, 1);
  return {
    ...state,
    chartOrderList: updatedOrderList,
  };
};

const toggleMenuHandler = (state, action) => {
  return {
    ...state,
    isSubMenuOpen: action.isOpen,
  };
}

const emptyOrderHandler = (state, action) => {
  return {
    ...state,
    isEmptyOrder: false,
  };
}

const clearAllHandler = (state, action) => {
  return {
    ...state,
    chartOrderList: [],
  };
}

const signInHandler = (state, action) => {
  return {
    ...state,
    redirectRoute: action.route,
  };
};

const authSuccessHandler = (state, action) => {
  return {
    ...state,
    userId: action.username,
    redirectRoute: "/",
    isSignedIn: true,
    error: null,
    token: action.idtoken
  };
};

const authFailHandler = (state, action) => {
  return {
    ...state,
    userId: null,
    isSignedIn: false,
    error: action.error.data.message
  };
}

const logoutHandler = (state, action) => {
  return {
    ...state,
    userId: null,
    isSignedIn: false,
    redirectRoute: "/logout",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRO: return addToChartHandler(state, action);
    case actionTypes.DELETE_PRO: return deleteItemHandler(state, action);
    case actionTypes.TOGGLE_SUBMENU: return toggleMenuHandler(state, action);
    case actionTypes.EMPTY_ORDER: return emptyOrderHandler(state, action);
    case actionTypes.CLEAR_ALL: return clearAllHandler(state, action);
    case actionTypes.SIGN_IN: return signInHandler(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccessHandler(state, action);
    case actionTypes.AUTH_FAIL: return authFailHandler(state, action);
    case actionTypes.LOG_OUT: return logoutHandler(state, action);
    default: return state;
  }
};

export default reducer;
