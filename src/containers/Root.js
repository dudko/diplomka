import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";

import IntroPage from "./IntroPage";
import About from "./About";
import MaterialInput from "./MaterialInput";
import Adjust from "./Adjust";
import Calculate from "./Calculate";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="wrapper">
        <Route component={Navigation} />
        <div className="ui main container">
          <Switch style={{ flex: 1 }}>
            <Route exact path="/" component={IntroPage} />
            <Route path="/about" component={About} />
            <Route path="/input" component={MaterialInput} />
            <Route path="/adjust" component={Adjust} />
            <Route path="/calculate" component={Calculate} />
            <Route
              render={() => (
                <div className="ui negative message">
                  <div className="header">This page does not exist.</div>
                </div>
              )}
            />
          </Switch>
        </div>

        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default Root;
