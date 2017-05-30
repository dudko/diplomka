import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plot from '../components/Plot';



// eslint-disable-next-line
const CreateWorker = require('worker-loader!../worker');

class Calculate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {
        x: [],
        y: [],
        z: [],
        youngs: [],
        compress: [],
      },
      processing: false,
      worker: new CreateWorker()
    }
  }

  render() {
    const { materials } = this.props;
    const { processing, worker, results } = this.state;

    return (
    <div>
      <button
        type="button"
        className="success"
        disabled={processing}
        onClick={() => {
          this.setState({
            processing: true,
            error: '',
          });
          worker.postMessage(materials);

          worker.onmessage = (msg) => {
            this.setState({ results: msg.data, processing: false });
          };
          worker.addEventListener('error', (e) => {
            this.setState({
              processing: false,
              error: e.message,
            });
          });
        }}
      >
        {processing ? '⚙️ Processing...' : ' ⚙️ Process'}
      </button>

      {results && 
        <div>
          <Plot
            key={'youngs'}
            points={results}
            redraw={true}
            propertyName={'youngs'}
            title={'Young\'s modulus'}
            unit={'GPa'}
          />
          <Plot
            key={'compress'}
            points={results}
            redraw={true}
            propertyName={'compress'}
            title={'Linear compressibility'}
          />
        </div>        
      }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  materials: state
})

export default connect(mapStateToProps)(Calculate);
