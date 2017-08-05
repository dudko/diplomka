import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import configureStore from "./store/configureStore";

import "semantic-ui-css/semantic.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "katex/dist/katex.min.css";

import "./index.css";

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById("root"));
