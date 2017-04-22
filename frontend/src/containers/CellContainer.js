import { connect } from 'react-redux';
import Cell from '../components/Cell';
import { cellChanged } from '../actions';

const mapStateToProps = (state) => ({
  phase: state.reducer
})

const mapDispatchToProps = dispatch => ({
  onCellChanged: (value, index) => {
    dispatch(cellChanged(value, index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell);