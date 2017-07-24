import React, { Component } from "react";

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: this.props.matrix.map(row => `${row.join(" ")}`).join("\n"),
      rowDelimiter: /\n/,
      cellDelimiter: /\s+/
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matrix: nextProps.matrix.map(row => `${row.join(" ")}`).join("\n")
    });
  }

  render() {
    const { matrix, rowDelimiter, cellDelimiter } = this.state;
    const { setElasticity, toggleModal } = this.props;

    return (
      <div>
<h1 className="ui header">
  Enter elastic constants
  <div className="sub header">The stiffness matrix is the n-element square matrix A defined by.</div>
</h1>
        

        <textarea        
          style={{
            resize: "none"
          }}
          rows={6}
          value={matrix}
          onChange={e => this.setState({ matrix: e.target.value })}
          onBlur={e =>
            setElasticity(
              e.target.value
                .split(rowDelimiter)
                .map(row => row.trim().split(cellDelimiter))
            )}
        />
      </div>
    );
  }
}
