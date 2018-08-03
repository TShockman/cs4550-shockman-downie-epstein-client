import {connect} from 'react-redux'
import {LOGIN_USER_REQUESTED} from '../../actions/userActions';
import Login from './Login';
import {selectUserState} from '../../selectors/userSelector';


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch({
      type: LOGIN_USER_REQUESTED,
      user
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
