import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import configureStore from "./store/configureStore";

// style
import "picnic/picnic.min.css";
import "font-awesome/css/font-awesome.css";

import "./index.css";

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById("root"));
