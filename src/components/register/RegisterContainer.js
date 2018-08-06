import {connect} from 'react-redux'
import {REGISTER_USER_REQUESTED} from '../../actions/userActions';
import Register from './Register';
import {selectUserState} from '../../selectors/userSelector';


function mapStateToProps(state) {
  const {user} = selectUserState(state);
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: user => dispatch({
      type: REGISTER_USER_REQUESTED,
      user
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
