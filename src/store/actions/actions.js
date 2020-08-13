import * as actionTypes from "./actionTypes";

export const addProduct = (order) => {
    return {
        type: actionTypes.ADD_PRO,
        order: order
    }
};

export const deleteProduct = (index) => {
    return {
        type: actionTypes.DELETE_PRO,
        index: index
    }
};

export const toggleSubMenu = (isOpen) => {
    return {
        type: actionTypes.TOGGLE_SUBMENU,
        isOpen: isOpen
    }
};

export const emptyOrder = () => {
    return {
        type: actionTypes.EMPTY_ORDER,
    }
};

export const clearAll = () => {
    return {
        type: actionTypes.CLEAR_ALL
    }
}