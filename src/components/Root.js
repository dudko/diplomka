import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import { Provider } from "react-redux";
import MaterialInput from "../containers/MaterialInput";
import Adjust from "../containers/Adjust";

import IntroPage from "./IntroPage";
import About from "../components/About";

import Calculate from "../containers/Calculate";

import Navigation from "./Navigation";
import Footer from "./Footer";

const Root = ({ store, history }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route component={Navigation} />
        <div className="ui main container">
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/input" component={MaterialInput} />
          <Route exact path="/adjust" component={Adjust} />
          <Route path="/calculate" component={Calculate} />
        </div>
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>;

export default Root;
