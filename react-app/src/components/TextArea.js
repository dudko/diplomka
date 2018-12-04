import React, { Component } from "react";

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: this.props.matrix.map(row => `${row.join(" ")}`).join("\n"),
      rowDelimiter: /\n/,
      cellDelimiter: /\s+/,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matrix: nextProps.matrix.map(row => `${row.join(" ")}`).join("\n"),
    });
  }

  render() {
    const { matrix, rowDelimiter, cellDelimiter } = this.state;
    const { setElasticity } = this.props;

    return (
      <textarea
        style={{
          resize: "none",
          marginBottom: "1em",
        }}
        rows={6}
        value={matrix}
        onChange={e => this.setState({ matrix: e.target.value })}
        onBlur={e =>
          setElasticity(
            e.target.value
              .split(rowDelimiter)
              .map(row => row.trim().split(cellDelimiter))
          )
        }
      />
    );
  }
}
