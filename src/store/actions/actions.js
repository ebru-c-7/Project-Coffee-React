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

export const signIn = (route) => {
    console.log("sign in actions ", route);

    return {
        type: actionTypes.SIGN_IN,
        route: route
    }
}

export const signInCheck = (mail, pass) => {
    return {
        type: actionTypes.SIGN_IN_CHECK,
        email: mail,
        password: pass
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}