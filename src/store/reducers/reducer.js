import * as actionTypes from "../actions/actionTypes";

const initialState = {
  chartOrderList: [],
  isEmptyOrder: false,
  isSubMenuOpen: false,
  isSignedIn: false,
  redirectRoute: null,
  userId: null,
  users: [
    {
      email: "test@test.com",
      password: "1234",
    },
    {
      email: "test2@test.com",
      password: "5678",
    },
  ],
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

const checkUserHandler = (state, action) => {
  let isUser = false;
  for(let user of state.users) {
    if(user.email === action.email && user.password === action.password) {
      isUser = true;
      break;
    }
  }
  return isUser;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRO:
      console.log(action.order);
      const updatedStateADD = addToChartHandler(state, action);
      return updatedStateADD;
    case actionTypes.DELETE_PRO:
      const updatedStateDL = deleteItemHandler(state, action);
      return updatedStateDL;
    case actionTypes.TOGGLE_SUBMENU:
      return {
        ...state,
        isSubMenuOpen: action.isOpen,
      };
    case actionTypes.EMPTY_ORDER:
      return { 
        ...state,
        isEmptyOrder: false,
      };
    case actionTypes.CLEAR_ALL:
      return {
        ...state,
        chartOrderList: [],
      };
    case actionTypes.SIGN_IN:
      return {
        ...state,
        redirectRoute: action.route,
      };
    case actionTypes.SIGN_IN_CHECK:
      let isValidUser = checkUserHandler(state, action);
      if(!isValidUser) {
        console.log("no such user");
        return;
      } else {
        console.log("this is right!");
        return {
          ...state,
          userId: action.email,
          redirectRoute: "/",
          isSignedIn: true
        };
      };
      case actionTypes.LOG_OUT:
        return {
          ...state,
          userId: null,
          isSignedIn: false, 
          redirectRoute: "/"
        };
    default:
      return state;
  }
};

export default reducer;
