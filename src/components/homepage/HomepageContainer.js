import {connect} from 'react-redux'
import {REGISTER_USER_REQUESTED} from '../../actions/userActions';
import Homepage from './Homepage';
import {selectUserState} from '../../selectors/userSelector';


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);