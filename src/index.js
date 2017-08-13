import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";
import createHistory from "history/createBrowserHistory";

import configureStore from "./store/configureStore";

import "semantic-ui-css/semantic.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "katex/dist/katex.min.css";

import "./index.css";

const history = createHistory();

const store = configureStore(history);
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById("root")
);
