import { connect } from 'react-redux';
import Phase from '../components/Phase';
import { constantChanged } from '../actions';

/*const PhaseContainer = ({ material, onConstantChanged }) => (
  <Phase
    material={material}
    onConstantChanged={onConstantChanged}
  />
);*/

// const mapStateToProps = (state) => ({
//   material: state
// })

const mapDispatchToProps = dispatch => ({
})

export default connect(mapDispatchToProps)(Phase);