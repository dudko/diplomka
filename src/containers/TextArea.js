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

        <h4>
          Enter stiffness matrix
          {" "}<a
            className="handPointer fa fa-info-circle"
            onClick={() => toggleModal("stiffnessMatrix")}
          />
        </h4>
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

        <div className="flex">
          <div className="half">
            <h5 className="tooltip-bottom" data-tooltip="regular expression">
              {"Row delimiter"}
            </h5>
            <input
              type="text"
              placeholder="default new line (\n)"
              onChange={e =>
                this.setState({
                  rowDelimeter: e.target.value
                })}
            />
          </div>
          <div className="half">
            <h5 className="tooltip-bottom" data-tooltip="regular expression">
              {"Cell delimiter"}
            </h5>
            <input
              type="text"
              placeholder="default space (\s+)"
              onChange={e =>
                this.setState({
                  cellDelimiter: new RegExp(e.target.value)
                })}
            />
          </div>
        </div>
      </div>
    );
  }
}
