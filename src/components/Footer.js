import React from "react";

const Footer = ({ count }) =>
  <div className="ui inverted vertical footer segment">
    <div className="ui container">
      <div className="ui stackable inverted divided equal height stackable grid">
        <div className="three wide column">
          <h4 className="ui inverted header">Sitemap</h4>
          <div className="ui inverted link list">
            <a href="#" className="item">
              About
            </a>
            <a href="#" className="item">
              Contact Us
            </a>
          </div>
        </div>
        <div className="five wide column">
          <h4 className="ui inverted header">Footer Header</h4>
          <p>
            Extra space for a call to action inside the footer that could help
            re-engage users.
          </p>
        </div>
        <div className="five wide column">
          <h4 className="ui inverted header">Footer Header</h4>
          <p>
            Extra space for a call to action inside the footer that could help
            re-engage users.
          </p>
        </div>
      </div>
    </div>
  </div>;

export default Footer;
