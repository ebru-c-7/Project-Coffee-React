import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const addProduct = (order) => {
  return {
    type: actionTypes.ADD_PRO,
    order: order,
  };
};

export const deleteProduct = (index) => {
  return {
    type: actionTypes.DELETE_PRO,
    index: index,
  };
};

export const toggleSubMenu = (isOpen) => {
  return {
    type: actionTypes.TOGGLE_SUBMENU,
    isOpen: isOpen,
  };
};

export const emptyOrder = () => {
  return {
    type: actionTypes.EMPTY_ORDER,
  };
};

export const clearAll = () => {
  return {
    type: actionTypes.CLEAR_ALL,
  };
};

export const signIn = (route) => {
  return {
    type: actionTypes.SIGN_IN,
    route: route,
  };
};

const findUserName = (email) => {
  let userInfo;

  const promise = new Promise((resolve, reject) => {
    Axios.get("https://project-coffee-react.firebaseio.com/users.json").then(
      (response) => {
        let fetchedUsers = [];
        for (let key in response.data) {
          fetchedUsers.push({
            userEmail: response.data[key].email,
            userName: response.data[key].username,
          });
        }
        userInfo = fetchedUsers.filter((el) => el.userEmail === email);
        userInfo = userInfo[0];
        userInfo = userInfo.userName;
        if (userInfo) {
          console.log(userInfo);
          resolve(userInfo);
        }
      }
    );
  });
  return promise;
};

export const authStart = (mail, password, method, username) => {
  return (dispatch) => {
    const authData = {
      email: mail,
      password: password,
      returnSecureToken: true,
    };

    let url =
      method === "signin"
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQFo9cdagqWcLLClxI5gIbHSMl8gy9N7g"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQFo9cdagqWcLLClxI5gIbHSMl8gy9N7g";

    Axios.post(url, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);

        if (method === "signin") {
          let userInfo;
          findUserName(mail).then((resp) => {
            userInfo = resp;
            dispatch(authSuccess(mail, userInfo, res.data.idToken));
          });
        }

        if (method === "signup") {
          Axios.post("https://project-coffee-react.firebaseio.com/users.json", {
            email: mail,
            username: username,
          })
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
          dispatch(authSuccess(mail, username, res.data.idToken));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const authSuccess = (email, username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email: email,
    username: username,
    idtoken: token,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const autoSignIn = () => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    Axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQFo9cdagqWcLLClxI5gIbHSMl8gy9N7g",
      {
        idToken: token,
      }
    )
      .then((response) => {
        let email = response.data.users[0].email;
        let username;

        findUserName(email).then((resp) => {
          console.log(resp);
          username = resp;
          dispatch(authSuccess(email, username, token));
        });
      })
      .catch((err) => console.log(err));
  };
};
