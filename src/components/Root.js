import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import MaterialInput from "../containers/MaterialInput";
import Adjust from "../containers/Adjust";

import IntroPage from "./IntroPage";
import About from "../components/About";

import Calculate from "../containers/Calculate";

import Navigation from "./Navigation";
import Footer from "./Footer";

const Root = ({ store }) =>
  <Provider store={store}>
    <Router>
      <div>
        <Navigation />
        <div className="ui main container">
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/enter" component={MaterialInput} />
          <Route exact path="/adjust" component={Adjust} />
          <Route path="/calculate" component={Calculate} />
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>;

export default Root;
