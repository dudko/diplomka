import { connect } from 'react-redux';
import Matrix from '../components/Matrix';
import { cellChanged } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  elasticity: state.inputForTensors[ownProps.id]
})

const mapDispatchToProps = dispatch => ({
  onCellChanged: (id, value, index) => {
    dispatch(cellChanged(id, value, index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);