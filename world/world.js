import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./app";

function reducer(state = {}, action) {
  console.log("reducer", "state", state, "action", action);
  switch (action) {
    case "SIZE_CHANGE":
      return { size: action.size };
    default:
      return state;
  }
}

const store = createStore(reducer, { size: 10 });

ReactDOM.render(
  <Provider store={store}><App/></Provider>, document.getElementById("app"));
