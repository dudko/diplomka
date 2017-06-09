import React, { Component } from "react";
import { connect } from "react-redux";

import { toggleModal } from "../actions/modalActions";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        stiffnessMatrix: {
          title: "Stiffness matrix",
          // prettier-ignore
          content:
            "In the finite element method for the numerical solution of elliptic partial differential equations, the stiffness matrix represents the system of linear equations that must be solved in order to ascertain an approximate solution to the differential equation."
        }
      }
    };
  }

  render() {
    const { data } = this.state;
    const { modal = null, toggleModal } = this.props;

    if (!modal) {
      return null;
    }

    const { title, content } = data[modal];

    return (
      <div className="modal">
        <div className="overlay">
          <article
            className="card"
            style={{
              width: "60%",
              margin: "15% auto"
            }}
          >
            <header>
              <h3>{title}</h3>
              <label className="close" onClick={() => toggleModal(null)}>
                &times;
              </label>
            </header>
            <section className="content">
              {content}
            </section>
            <footer />
          </article>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps, { toggleModal })(Modal);
