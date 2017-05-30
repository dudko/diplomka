import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_ELASTICITY } from '../constants/defaults';
import { addToComposite } from '../actions';

import TextArea from './TextArea';
import MaterialProjectSearch from './MaterialProjectSearch';


// eslint-disable-next-line
const CreateWorker = require('worker-loader!../worker');

class MaterialInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stiffness: DEFAULT_ELASTICITY
    }
  }

  render() {
    const { stiffness } = this.state;
    const { materials, addToComposite } = this.props;
 
    return (
      <div>
        <button
          onClick={() => {
            addToComposite(stiffness);
            this.setState({
              stiffness: DEFAULT_ELASTICITY
            });
          }}
        >
          Add
        </button>

        <div className="flex two">
          <div>
            <TextArea
              stiffness={stiffness}
              setElasticity={stiffness => this.setState({ stiffness })}
            />
          </div>          
          
          <MaterialProjectSearch
            setElasticity={(stiffness, crystalSystem) => this.setState({
              stiffness,
              crystalSystem,
            })}
          />

          {materials.map((matrix, index) => 
            <div
              key={index}            
            >
              <h3><span className="label success">{`# ${index}`}</span></h3>
              <table
                style={{
                  tableLayout: 'fixed',
                  width: '100%'
                }}
              >
                <tbody>
                  {matrix.map((row, index) =>
                    <tr key={index}>
                      {row.map((cell, index) =>
                        <td key={index}>{cell}</td>)}
                    </tr>,
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  materials: state
})

export default connect(mapStateToProps, { addToComposite })(MaterialInput);
