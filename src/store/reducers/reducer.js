import * as actionTypes from "../actions/actionTypes";

const initialState = {
  chartOrderList: [],
  isEmptyOrder: false,
  isSubMenuOpen: false,
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
    default:
      return state;
  }
};

export default reducer;
