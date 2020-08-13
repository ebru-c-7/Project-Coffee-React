import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import { BrowserRouter } from 'react-router-dom';
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import reducer from "./store/reducers/reducer";

const logger = store => {
  return next => {
    return action => {
      const res = next(action);
      return res;
    }
  }
};

const store = createStore(reducer, applyMiddleware(logger, thunk));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
